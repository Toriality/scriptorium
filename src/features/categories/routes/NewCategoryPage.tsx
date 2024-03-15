import { Card } from "@/components/Card";
import { CategoryForm } from "../components/CategoryForm";
import { CategoryForm as CategoryFormType } from "../types";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useCategories } from "..";

export const NewCategoryPage = () => {
  const { t } = useTranslation();

  const { createCategory } = useCategories();

  async function onSubmit(category: CategoryFormType) {
    createCategory(category);
  }

  return (
    <AnimatedPage>
      <Card>
        <CategoryForm
          title={t("categories.forms.new.title")}
          subtitle={t("categories.forms.new.subtitle")}
          onSubmit={onSubmit}
        />
      </Card>
    </AnimatedPage>
  );
};
