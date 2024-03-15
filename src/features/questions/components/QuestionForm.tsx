import { schema, FormData } from "../utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitInput } from "@/components/Form";
import { TextAreaInput } from "@/components/Form/TextAreaInput";
import { TagList, useTags } from "@/features/tags";
import { useEffect } from "react";
import { InputError } from "@/components/Form/InputError";
import { useTranslation } from "react-i18next";
import { QuestionFormType } from "..";
import { format } from "../utils/format";
import { useCategory } from "@/features/categories";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: (data: QuestionFormType) => void;
  defaultValues?: FormData;
}

export const QuestionForm: React.FC<Props> = ({
  title,
  subtitle,
  onSubmit,
  defaultValues,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, defaultValues: defaultValuesFormState },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { category } = useCategory();
  const { tags } = useTags();

  useEffect(() => {
    if (category) {
      setValue("category_id", category.id);
    }
  }, [setValue, category]);

  return (
    <Form>
      <Form.Title>{title}</Form.Title>
      <Form.Subtitle>{subtitle}</Form.Subtitle>

      <Form.Body>
        <div className="flex flex-col gap-4">
          <TextAreaInput
            error={errors.text?.message}
            inputClassName="w-full resize-none"
            rows={6}
            placeholder={t("questions.forms.text")}
            {...register("text")}
          ></TextAreaInput>

          <div className="space-y-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex w-full gap-2">
                <input
                  defaultChecked={
                    defaultValuesFormState
                      ? defaultValuesFormState.answer === i
                      : i === 0
                  }
                  type="radio"
                  {...register(`answer`)}
                  value={i}
                  className="my-auto size-4 accent-green-300 focus:outline-none"
                />
                <TextAreaInput
                  error={errors.options?.[i]?.message}
                  placeholder={t("questions.forms.option", {
                    index: format(i),
                  })}
                  containerClassName="w-full"
                  inputClassName="w-full resize-none"
                  {...register(`options.${i}`)}
                ></TextAreaInput>
              </div>
            ))}
          </div>

          <TagList
            handleToggleTag={(tag) => {
              if (getValues("tags")?.includes(tag.id)) {
                setValue(
                  "tags",
                  getValues("tags")?.filter((id) => id !== tag.id),
                );
              } else {
                setValue("tags", [...(getValues("tags") || []), tag.id]);
              }
            }}
            toggledTags={getValues("tags") || []}
            tags={tags || null}
          />
          <div className="mx-auto">
            <InputError>{errors.tags?.message}</InputError>
          </div>

          <SubmitInput
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
            error={errors.root?.message}
          />
        </div>
      </Form.Body>
    </Form>
  );
};
