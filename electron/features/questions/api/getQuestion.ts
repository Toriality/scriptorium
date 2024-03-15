import { findDatabase, select } from "../../../database";
import { Subject } from "@/features/subjects";
import { GetQuestion } from "../../../types";
import { QuestionDatabaseType } from "@/features/questions";

export const getQuestion: GetQuestion = async (
  subject: Subject,
  question_id: number,
) => {
  const db = findDatabase(subject);

  const question = (await select(
    db,
    "questions",
    {
      id: question_id,
    },
    true,
  )) as QuestionDatabaseType;

  return question;
};
