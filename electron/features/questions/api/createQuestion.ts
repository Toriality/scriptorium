import { CreateQuestion } from "../../../types";
import { Subject } from "@/features/subjects";
import { QuestionDatabaseType, QuestionFormType } from "@/features/questions";
import { findDatabase, select } from "../../../database";
import { insert } from "../../../database/funcs/insert";

export const createQuestion: CreateQuestion = async (
  subject: Subject,
  question: QuestionFormType,
) => {
  const db = findDatabase(subject);

  const q = {
    ...question,
    options: JSON.stringify(question.options),
    tags: JSON.stringify(question.tags),
  };

  const id = await insert(db, "questions", q);
  const newQuestion = (await select(
    db,
    "questions",
    { id },
    true,
  )) as QuestionDatabaseType;

  return {
    message: "Question created",
    success: true,
    payload: newQuestion,
  };
};
