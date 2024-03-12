import { Card } from "@/components/Card";
import { CategoryForm } from "../components/CategoryForm";
import { useNavigate } from "react-router-dom";
import { useData } from "@/providers/Data";
import { CategoryForm as FormData } from "../types";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export const NewCategoryPage = () => {
  const { t } = useTranslation();

  const { state, actions } = useData();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    if (state.current.subject == null) throw new Error("Subject not set");
    const newCategory = await actions.createCategory(data);
    navigate("/" + state.current.subject.subject + "/" + newCategory.id, {
      replace: true,
    });
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
