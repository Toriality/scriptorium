import { Card } from "@/components/Card";
import { QuestionList, useQuestions } from "@/features/questions";
import { TestList } from "@/features/tests";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useCategory } from "..";
import { useTests } from "@/features/tests";

export function ShowCategoryPage() {
  const { t } = useTranslation();

  const { category } = useCategory();
  const { questions, deleteQuestion } = useQuestions();
  const { tests, deleteTest } = useTests();

  return (
    <AnimatedPage>
      <Card>
        <Card.Title to="questions/new">
          {t("questions.title", {
            category: category?.name,
          })}
        </Card.Title>

        <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
      </Card>

      <Card>
        <Card.Title to="tests/new">
          {t("tests.title", {
            category: category?.name,
          })}
        </Card.Title>

        <TestList tests={tests} deleteTest={deleteTest} />
      </Card>
    </AnimatedPage>
  );
}
