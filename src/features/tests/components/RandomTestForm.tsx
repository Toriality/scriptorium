import { zodResolver } from "@hookform/resolvers/zod";
import { RandomTestSchemaType, randomTestSchema } from "../utils/schema";
import { useForm } from "react-hook-form";
import { Form, SubmitInput, TextInput } from "@/components/Form";
import { TagList, useTags } from "@/features/tags";
import { InputError } from "@/components/Form/InputError";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RandomTestFormType } from "..";
import { useCategory } from "@/features/categories";
import { useQuestions } from "@/features/questions";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: (data: RandomTestFormType) => void;
  defaultValues?: RandomTestFormType;
}

export const RandomTestForm: React.FC<Props> = ({
  title,
  subtitle,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RandomTestSchemaType>({
    defaultValues: {
      tags: [],
    },
    resolver: zodResolver(randomTestSchema),
  });

  const { category } = useCategory();
  const { questions } = useQuestions();
  const { tags } = useTags();

  const toggleTag = (tagId: number) => {
    if (getValues("tags").includes(tagId)) {
      setValue(
        "tags",
        getValues("tags").filter((id) => id !== tagId),
      );
    } else {
      setValue("tags", [...getValues("tags"), tagId]);
    }
  };

  useEffect(() => {
    if (category) {
      if (!getValues("category_id")) {
        setValue("category_id", category.id);
      }
    }
  }, [category, getValues, setValue]);

  const selectedTags = watch("tags");

  const maxNumberOfQuestions = useMemo(() => {
    if (selectedTags.length === 0) {
      clearErrors("tags");
      return questions?.length || 0;
    }
    const availableQuestions = questions?.filter((question) => {
      const tagIds = JSON.parse(question.tags);
      return selectedTags.some((tag) => tagIds.includes(tag));
    });
    if (availableQuestions?.length === 0) {
      setError("tags", {
        message: t("tests.forms.errors.random.noQuestions"),
      });
    } else {
      clearErrors("tags");
    }
    return availableQuestions?.length || 0;
  }, [questions, t, selectedTags, setError, clearErrors]);

  return (
    <Form>
      <Form.Title>{title}</Form.Title>
      <Form.Subtitle>{subtitle}</Form.Subtitle>

      <Form.Body>
        <div className="flex flex-col gap-4">
          <div className="flex">
            <TextInput
              autoFocus
              placeholder="Test name"
              containerClassName="grow"
              inputClassName="w-full"
              {...register("name")}
              error={errors.name?.message}
            />
            <TextInput
              inputClassName="w-48"
              max={maxNumberOfQuestions}
              min={1}
              disabled={maxNumberOfQuestions === 0}
              type="number"
              placeholder={t("tests.forms.random.numberOfQuestions")}
              {...register("numberOfQuestions")}
              error={errors.numberOfQuestions?.message}
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs">{t("tests.forms.random.selectTags")}</p>
            <TagList handleToggleTag={(t) => toggleTag(t.id)} tags={tags} />
            {errors.tags?.message && (
              <InputError>{errors.tags?.message}</InputError>
            )}
          </div>
          <SubmitInput isSubmitting={false} onSubmit={handleSubmit(onSubmit)} />
        </div>
      </Form.Body>
    </Form>
  );
};
