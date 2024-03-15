import { Card } from "@/components/Card";
import { SubjectForm } from "../components/SubjectForm";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useSubjects } from "../hooks/useSubjects";

export const NewSubjectPage = () => {
  const { t } = useTranslation();

  const { createSubject } = useSubjects();

  async function onSubmit(data: { subject: string }) {
    createSubject(data.subject);
  }

  return (
    <AnimatedPage>
      <Card>
        <SubjectForm
          title={t("subjects.forms.new.title")}
          subtitle={t("subjects.forms.new.subtitle")}
          onSubmit={onSubmit}
        />
      </Card>
    </AnimatedPage>
  );
};
