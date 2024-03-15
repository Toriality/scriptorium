import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../api/getQuestion";
import { QuestionDatabaseType } from "..";

export const useQuestion = () => {
  const { subject_name, question_id } = useParams();
  const [question, setQuestion] = useState<QuestionDatabaseType | null>(null);

  useEffect(() => {
    if (!subject_name || !question_id) return;
    getQuestion(subject_name, parseInt(question_id)).then(setQuestion);
  }, [subject_name, question_id]);

  return { question };
};
