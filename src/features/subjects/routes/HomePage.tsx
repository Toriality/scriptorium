import { Card } from "@/components/Card";
import { SubjectList } from "../components/SubjectList";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useTranslation } from "react-i18next";
import { useSubjects } from "../hooks/useSubjects";

export function HomePage() {
  const { t } = useTranslation();
  const { subjects, deleteSubject, editSubject } = useSubjects();

  return (
    <AnimatedPage>
      <Card>
        <Card.Title>{t("subjects.title")}</Card.Title>

        <SubjectList
          subjects={subjects}
          deleteSubject={deleteSubject}
          editSubject={(o, n) => editSubject(o.subject, n.subject)}
        />
      </Card>
    </AnimatedPage>
  );
}
