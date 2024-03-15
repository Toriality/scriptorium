import { QuestionDatabaseType } from "@/features/questions";
import { findDatabase, select } from "../../../database";
import { GetQuestions } from "../../../types";

export const getQuestions: GetQuestions = async (subject, category_id, ids) => {
  const db = findDatabase(subject);

  if (ids) {
    return (await select(db, "questions", {
      id: ids,
    })) as QuestionDatabaseType[];
  }

  const questions = (await select(db, "questions", {
    category_id,
  })) as QuestionDatabaseType[];

  return questions;
};
