import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionComponent } from "..";
import { useState } from "react";
import { Card } from "@/components/Card";
import { SubmitInput } from "@/components/Form";
import { InputError } from "@/components/Form/InputError";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useQuestion } from "../hooks/useQuestion";

const schema = z.object({
  answer: z.number(),
});

type FormData = z.infer<typeof schema>;

export const ShowQuestionPage: React.FC = () => {
  const { t } = useTranslation();

  const [submittedAnswer, setSubmittedAnswer] = useState<number | undefined>(
    undefined,
  );

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { question } = useQuestion();

  const setAnswer = (answer: number) => {
    if (submittedAnswer !== undefined) return;
    setValue("answer", answer);
  };

  const submit = (data: FormData) => {
    setSubmittedAnswer(data.answer);
  };

  if (!question) return null;

  return (
    <AnimatedPage>
      <Card>
        <QuestionComponent
          answer={watch("answer")}
          index={null}
          setAnswer={(_, answer) => setAnswer(answer)}
          question={question}
          submittedAnswer={submittedAnswer}
        />
        <SubmitInput
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(submit)}
          disabled={submittedAnswer !== undefined}
          value={
            submittedAnswer === undefined
              ? t("buttons.submit")
              : t("buttons.done")
          }
        />
        {errors.answer && <InputError>{errors.answer.message}</InputError>}
      </Card>
    </AnimatedPage>
  );
};
