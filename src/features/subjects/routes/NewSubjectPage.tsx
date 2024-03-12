import { Card } from "@/components/Card";
import { SubjectForm } from "../components/SubjectForm";
import { useData } from "@/providers/Data";
import { useTranslation } from "react-i18next";
import { useRedirect } from "@/hooks/useRedirect";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

export const NewSubjectPage = () => {
  const { t } = useTranslation();

  const { redirect } = useRedirect();
  const { actions } = useData();

  async function onSubmit(data: { subject: string }) {
    const result = await actions.createSubject(data.subject);
    redirect({
      to: "/" + data.subject,
      toast: {
        message: result.message,
        type: "success",
      },
    });
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
