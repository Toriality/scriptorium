import { schema, FormData } from "../utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitInput, TextInput } from "@/components/Form";
import { CategoryIcon } from "./CategoryIcon";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}

export const CategoryForm: React.FC<Props> = ({
  title,
  subtitle,
  onSubmit,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      <Form.Title>{title}</Form.Title>
      <Form.Subtitle>{subtitle}</Form.Subtitle>

      <Form.Body onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div>
            <CategoryIcon icon={watch("icon")} className="h-20 w-20" />
          </div>

          <div className="basis-[50%] space-y-2">
            <TextInput
              autoFocus
              placeholder={t("categories.forms.name")}
              error={errors.name?.message}
              {...register("name")}
            />
            <TextInput
              placeholder={t("categories.forms.icon")}
              error={errors.icon?.message}
              {...register("icon")}
            />
          </div>

          <SubmitInput
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
            error={errors.root?.message}
          />
        </div>
      </Form.Body>
    </Form>
  );
};
