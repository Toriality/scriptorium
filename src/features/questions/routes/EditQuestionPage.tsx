import { Card } from "@/components/Card";
import { useQuestion } from "../hooks/useQuestion";
import { useTranslation } from "react-i18next";
import { QuestionFormType, useQuestions } from "..";
import { QuestionForm as QuestionFormComponent } from "../components/QuestionForm";
import { convert } from "../utils/convert";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export const EditQuestionPage = () => {
  const { t } = useTranslation();

  const { question } = useQuestion();
  const { editQuestion } = useQuestions();

  const defaultValues = question ? convert(question) : null;

  async function onSubmit(data: QuestionFormType) {
    editQuestion(data);
  }

  return (
    defaultValues &&
    question && (
      <AnimatedPage>
        <Card>
          <QuestionFormComponent
            title={t("questions.forms.edit.title")}
            subtitle={t("questions.forms.edit.subtitle")}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          />
        </Card>
      </AnimatedPage>
    )
  );
};
