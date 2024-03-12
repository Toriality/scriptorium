import { Card } from "@/components/Card";
import { useNavigate } from "react-router-dom";
import { useData } from "@/providers/Data";
import { useQuestion } from "../hook/useQuestion";
import { useTranslation } from "react-i18next";
import { QuestionFormType } from "..";
import { QuestionForm as QuestionFormComponent } from "../components/QuestionForm";
import { convert } from "../utils/convert";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export const EditQuestionPage = () => {
  const { t } = useTranslation();

  const { actions, state } = useData();
  const { question } = useQuestion({ state });
  const navigate = useNavigate();

  const defaultValues = question ? convert(question) : null;

  async function onSubmit(data: QuestionFormType) {
    await actions.editQuestion(data);
    navigate("../../", { replace: true });
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
