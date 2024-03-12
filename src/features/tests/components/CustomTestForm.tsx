import { customTestSchema, CustomTestSchemaType } from "../utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useData } from "@/providers/Data";
import { Form, SubmitInput, TextInput } from "@/components/Form";
import { twMerge } from "tailwind-merge";
import { useEffect, useMemo, useState } from "react";
import { InputError } from "@/components/Form/InputError";
import { QuestionDatabaseType } from "@/features/questions";
import { Tag, TagList } from "@/features/tags";
import { useTranslation } from "react-i18next";
import { CustomTestFormType } from "../types";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: (data: CustomTestFormType) => void;
  defaultValues?: CustomTestFormType;
}

export const CustomTestForm: React.FC<Props> = ({
  title,
  subtitle,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CustomTestSchemaType>({
    resolver: zodResolver(customTestSchema),
  });

  const { state } = useData();

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    if (!getValues("category_id")) {
      setValue("category_id", state.current.category?.category.id || 0);
    }
  }, [state, getValues, setValue]);

  const formattedQuestions = useMemo(() => {
    return state.current.category?.questions.map((q) => {
      return {
        ...q,
        tags: JSON.parse(q.tags),
        options: JSON.parse(q.options),
      };
    });
  }, [state]);

  const toggleQuestion = (questionId: number) => {
    if (getValues("questions")?.includes(questionId)) {
      setValue(
        "questions",
        getValues("questions").filter((id) => id !== questionId),
      );
    } else {
      setValue("questions", [...(getValues("questions") || []), questionId]);
    }
  };

  const filteredQuestions = useMemo(() => {
    return formattedQuestions?.filter((q) => {
      if (selectedTags.length === 0) {
        return true;
      } else {
        return q.tags.some((t: number) => selectedTags.includes(t));
      }
    });
  }, [selectedTags, formattedQuestions]);

  return (
    <Form>
      <Form.Title>{title}</Form.Title>
      <Form.Subtitle>{subtitle}</Form.Subtitle>

      <Form.Body className="space-y-4">
        <TextInput
          autoFocus
          {...register("name")}
          placeholder={t("tests.forms.name")}
          containerClassName="w-full"
          inputClassName="w-full h-12"
          error={errors.name?.message}
        />
        <p className="text-xs">{t("tests.forms.custom.selectTests")}</p>
        <FilterWrapper
          tags={state.current.subject?.tags || null}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <div className="space-y-2">
          {filteredQuestions?.map((question) => (
            <QuestionWrapper
              key={question.id}
              question={question}
              handleToggleQuestion={toggleQuestion}
              selected={watch("questions")?.includes(question.id)}
            />
          ))}
          {errors.questions?.message && (
            <InputError>{errors.questions?.message}</InputError>
          )}
        </div>
        <p className="text-xs">
          {t("tests.forms.custom.numberOfQuestions", {
            numberOfQuestions: watch("questions")?.length,
          })}
        </p>
        <SubmitInput isSubmitting={false} onSubmit={handleSubmit(onSubmit)} />
      </Form.Body>
    </Form>
  );
};

interface FilterWrapperProps {
  tags: Tag[] | null;
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({
  tags,
  setSelectedTags,
  selectedTags,
}) => {
  const { t } = useTranslation();

  const toggleTag = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags((prevTags) => prevTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagId]);
    }
  };

  return (
    <div className="flex rounded p-2 shadow ring-2 ring-primary">
      <p className="basis-1/6 p-1.5 text-xs">
        {t("tests.forms.custom.filterByTag")}
      </p>
      <div className="">
        <TagList tags={tags} handleToggleTag={(t) => toggleTag(t.id)} />
      </div>
    </div>
  );
};

interface QuestionWrapperProps {
  question: QuestionDatabaseType;
  handleToggleQuestion: (questionId: number) => void;
  selected: boolean;
}
const QuestionWrapper: React.FC<QuestionWrapperProps> = ({
  question,
  handleToggleQuestion,
  selected,
}) => {
  const questionBaseClass =
    "rounded bg-item-default hover:bg-item-hover ring-2 ring-transparent p-4 shadow cursor-pointer";
  const questionSelectedClass =
    "bg-selected-default ring-selected hover:bg-selected-hover";

  return (
    <div
      onClick={() => handleToggleQuestion(question.id)}
      className={twMerge(questionBaseClass, selected && questionSelectedClass)}
    >
      <p className="truncate">{question.text}</p>
    </div>
  );
};
