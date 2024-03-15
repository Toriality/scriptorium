import { Card } from "@/components/Card";
import { QuestionForm } from "../components/QuestionForm";
import { QuestionFormType as QuestionFormType } from "../types";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useQuestions } from "..";

export const NewQuestionPage = () => {
  const { t } = useTranslation();

  const { createQuestion } = useQuestions();

  async function onSubmit(data: QuestionFormType) {
    createQuestion(data);
  }

  return (
    <AnimatedPage>
      <Card>
        <QuestionForm
          title={t("questions.forms.new.title")}
          subtitle={t("questions.forms.new.subtitle")}
          onSubmit={onSubmit}
        />
      </Card>
    </AnimatedPage>
  );
};
