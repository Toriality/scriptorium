import { Card } from "@/components/Card";
import { SubmitInput } from "@/components/Form";
import { QuestionComponent, useQuestions } from "@/features/questions";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputError } from "@/components/Form/InputError";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useTest } from "../hooks/useTest";

const schema = z.object({
  answers: z.array(z.number()).default([]),
});

type Schema = z.infer<typeof schema>;

export const ShowTestPage: React.FC = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { answers: [] },
  });

  const { test, submitTest } = useTest();
  const { questions } = useQuestions(JSON.parse(test?.questions || "[]"));

  const submittedAnswers = useMemo(() => {
    if (test) {
      const answers = test.answers ? JSON.parse(test.answers) : undefined;
      return answers;
    }
  }, [test]);

  const handleAnswer = (i: number | null, answer: number) => {
    if (i === null) return;
    if (submittedAnswers) return;
    setValue(`answers.${i}`, answer);
  };

  const submit = (data: Schema) => {
    if (!test || !questions) return;
    if (data.answers.length < questions.length) {
      return setError("answers", {
        message: t("tests.errors.answers"),
      });
    }
    const submittedTest = {
      ...test,
      answers: JSON.stringify(data.answers),
      completed: 1,
    };
    submitTest(submittedTest);
    setValue("answers", []);
  };

  const reset = () => {
    if (!test || !questions) return;
    const submittedTest = {
      ...test,
      answers: null,
    };
    submitTest(submittedTest);
  };

  return (
    <AnimatedPage>
      <Card>
        <div className="w-full space-y-24">
          {questions?.map((question, i) => (
            <QuestionComponent
              key={question.id}
              question={question}
              index={i}
              answer={watch(`answers.${i}`)}
              submittedAnswer={submittedAnswers?.[i]}
              setAnswer={handleAnswer}
            />
          ))}
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex gap-2">
              <SubmitInput
                value={submittedAnswers ? "Done!" : "Submit"}
                disabled={submittedAnswers}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit(submit, () =>
                  setError("root", {
                    message: t("tests.errors.answers"),
                  }),
                )}
              />
              {submittedAnswers && (
                <SubmitInput
                  isSubmitting={isSubmitting}
                  value="Reset"
                  className="bg-transparent text-link-default hover:bg-transparent hover:text-link-hover"
                  onSubmit={reset}
                />
              )}
            </div>
            {errors?.answers || errors?.root ? (
              <InputError>
                {errors?.answers?.message || errors?.root?.message}
              </InputError>
            ) : null}
          </div>
        </div>
      </Card>
    </AnimatedPage>
  );
};
