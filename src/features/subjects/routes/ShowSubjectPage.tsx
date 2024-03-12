import { useParams } from "react-router-dom";
import { useData } from "@/providers/Data";
import { useEffect } from "react";
import { Card } from "@/components/Card";
import { CategoryList } from "@/features/categories";
import { TagList } from "@/features/tags";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export function ShowSubjectPage() {
  const { t } = useTranslation();

  const { state, actions } = useData();
  const { subject_name } = useParams();

  useEffect(() => {
    if (!state.current.subject) actions.setCurrentSubject(subject_name!);
    if (state.current.category) actions.leaveCurrentCategoryData();
  }, [state, actions, subject_name]);

  return (
    <AnimatedPage>
      {/* <Card
        style="stats"
        styleProps={{
          background: "rgb(27, 255, 198",
        }}
      >
        <Card.Title disableNewButton>Subject's Statistics</Card.Title>
        <div>
          <div>
            <p>
              Total categories:
              <span>{state.current.subject?.categories.length}</span>
            </p>
            <p>
              Total tags:
              <span>{state.current.subject?.tags.length}</span>
            </p>
          </div>
        </div>
      </Card> */}
      <Card>
        <Card.Title>
          {t("categories.title", {
            subject: state.current.subject?.subject,
          })}
        </Card.Title>

        <CategoryList
          categories={state.current.subject?.categories || null}
          deleteCategory={actions.deleteCategory}
          editCategory={actions.editCategory}
        />
      </Card>

      <Card>
        <Card.Title disableNewButton>
          {t("tags.title", {
            subject: state.current.subject?.subject,
          })}
        </Card.Title>

        <TagList
          tags={state.current.subject?.tags || null}
          handleDelete={actions.deleteTag}
          handleAddTag={actions.addTag}
        />
      </Card>
    </AnimatedPage>
  );
}
