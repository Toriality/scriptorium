import { Card } from "@/components/Card";
import { useEffect } from "react";
import { useData } from "@/providers/Data";
import { useParams } from "react-router-dom";
import { QuestionList } from "@/features/questions";
import { TestList } from "@/features/tests";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export function ShowCategoryPage() {
  const { t } = useTranslation();

  const { category_id } = useParams();
  const { state, actions } = useData();

  useEffect(() => {
    if (!state.current.category)
      actions.setCurrentCategory(parseInt(category_id!));
  }, [state, actions, category_id]);

  return (
    <AnimatedPage>
      <Card>
        <Card.Title to="questions/new">
          {t("questions.title", {
            category: state.current.category?.category.name,
          })}
        </Card.Title>

        <QuestionList
          questions={state.current.category?.questions || null}
          deleteQuestion={actions.deleteQuestion}
        />
      </Card>

      <Card>
        <Card.Title to="tests/new">
          {t("tests.title", {
            category: state.current.category?.category.name,
          })}
        </Card.Title>

        <TestList
          tests={state.current.category?.tests || null}
          deleteTest={actions.deleteTest}
        />
      </Card>
    </AnimatedPage>
  );
}
