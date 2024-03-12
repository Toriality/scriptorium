import { Card } from "@/components/Card";
import { useNavigate } from "react-router-dom";
import { useData } from "@/providers/Data";
import { QuestionForm } from "../components/QuestionForm";
import { QuestionFormType as QuestionFormType } from "../types";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export const NewQuestionPage = () => {
  const { t } = useTranslation();

  const { actions } = useData();
  const navigate = useNavigate();

  async function onSubmit(data: QuestionFormType) {
    await actions.createQuestion(data);
    navigate("../../", { replace: true });
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
