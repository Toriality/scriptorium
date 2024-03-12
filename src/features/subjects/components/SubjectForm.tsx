import { schema, FormData } from "../utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitInput, TextInput } from "@/components/Form";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}

export const SubjectForm: React.FC<Props> = ({
  title,
  subtitle,
  onSubmit,
  defaultValues,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      <Form.Title>{title}</Form.Title>
      <Form.Subtitle>{subtitle}</Form.Subtitle>

      <Form.Body>
        <div className="flex gap-4">
          <TextInput
            containerClassName="w-min"
            placeholder={t("subjects.forms.name")}
            error={errors.subject?.message}
            {...register("subject")}
          />
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
