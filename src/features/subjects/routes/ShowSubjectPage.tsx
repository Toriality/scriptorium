import { Card } from "@/components/Card";
import { CategoryList } from "@/features/categories";
import { TagList, useTags } from "@/features/tags";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useSubject } from "../hooks/useSubject";
import { useCategories } from "@/features/categories/";

export function ShowSubjectPage() {
  const { t } = useTranslation();

  const { subject } = useSubject();
  const { categories, editCategory, deleteCategory } = useCategories();
  const { tags, addTag, deleteTag } = useTags();

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
            subject: subject?.subject,
          })}
        </Card.Title>

        <CategoryList
          categories={categories || null}
          deleteCategory={deleteCategory}
          editCategory={editCategory}
        />
      </Card>

      <Card>
        <Card.Title disableNewButton>
          {t("tags.title", {
            subject: subject?.subject,
          })}
        </Card.Title>

        <TagList tags={tags} handleDelete={deleteTag} handleAddTag={addTag} />
      </Card>
    </AnimatedPage>
  );
}
