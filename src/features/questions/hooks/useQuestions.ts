import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionDatabaseType, QuestionFormType } from "..";
import { getQuestions } from "../api/getQuestions";
import { deleteQuestion as deleteQuestionAPI } from "../api/deleteQuestion";
import { editQuestion as editQuestionAPI } from "../api/editQuestion";
import { createQuestion as createQuestionAPI } from "../api/createQuestion";
import { useToast } from "@/hooks/useToast";

export const useQuestions = (ids?: number[]) => {
  const { category_id, subject_name } = useParams();
  const [questions, setQuestions] = useState<QuestionDatabaseType[] | null>(
    null,
  );

  const { toast } = useToast();

  useEffect(() => {
    if (!category_id || !subject_name) return;
    getQuestions(subject_name, parseInt(category_id), ids).then(setQuestions);
  }, [category_id, subject_name, ids]);

  const deleteQuestion = async (question: QuestionDatabaseType) => {
    const result = await deleteQuestionAPI(subject_name!, question);
    if (result.success) {
      setQuestions((prev) => prev!.filter((q) => q.id !== question.id));
      toast({
        shouldRedirect: false,
        toast: { message: result.message, type: "success" },
      });
    }
  };

  const editQuestion = async (question: QuestionFormType) => {
    const result = await editQuestionAPI(subject_name!, question);
    if (result.success) {
      setQuestions((prev) =>
        prev!.map((q) => (q.id === question.id ? result.payload! : q)),
      );
      toast({
        toast: { message: result.message, type: "success" },
        shouldRedirect: true,
        to: `../../`,
      });
    }
  };

  const createQuestion = async (question: QuestionFormType) => {
    const result = await createQuestionAPI(subject_name!, question);
    if (result.success) {
      setQuestions((prev) => [...prev!, result.payload!]);
      toast({
        toast: { message: result.message, type: "success" },
        shouldRedirect: true,
        to: "../..",
      });
    }
  };

  return { questions, deleteQuestion, editQuestion, createQuestion };
};
