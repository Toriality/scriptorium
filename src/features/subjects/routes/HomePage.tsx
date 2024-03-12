import { Card } from "@/components/Card";
import { useData } from "@/providers/Data";
import { useEffect, useRef } from "react";
import { SubjectList } from "../components/SubjectList";
import { AnimatedPage } from "@/components/UI/AnimatedPage";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const hasFetchedData = useRef(false);

  const { state, actions } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    if (!hasFetchedData.current) {
      actions.setSubjects();
      hasFetchedData.current = true;
    }
  }, [actions]);

  useEffect(() => {
    if (state.current.subject || state.current.category)
      actions.leaveAllCurrentData();
  }, [state, actions]);

  return (
    <AnimatedPage>
      <Card>
        <Card.Title>{t("subjects.title")}</Card.Title>

        <SubjectList
          subjects={state.subjects}
          deleteSubject={actions.deleteSubject}
          editSubject={actions.editSubject}
        />
      </Card>
    </AnimatedPage>
  );
}
