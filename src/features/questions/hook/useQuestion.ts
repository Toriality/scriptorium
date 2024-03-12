import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useRedirect } from "@/hooks/useRedirect";
import { DataState } from "@/providers/Data";

export const useQuestion = ({ state }: { state: DataState }) => {
  const { question_id } = useParams();
  const { redirect } = useRedirect();

  const id = useMemo(
    () => (question_id ? parseInt(question_id) : null),
    [question_id],
  );

  const question = useMemo(
    () => state.current.category?.questions.find((q) => q.id === id) || null,
    [id, state],
  );

  useEffect(() => {
    if (!question) {
      redirect({
        to: "../../",
        toast: {
          type: "error",
          message: "Error fetching question",
        },
      });
    }
  }, [question, redirect]);

  return { question };
};
