import { findDatabase } from "../../../database";
import { update } from "../../../database/funcs/update";
import { EditQuestion } from "../../../types";

export const editQuestion: EditQuestion = async (subject, question) => {
  const db = findDatabase(subject);

  const q = {
    id: question.id!,
    ...question,
    options: JSON.stringify(question.options),
    tags: JSON.stringify(question.tags),
  };

  await update(db, "questions", question.id!, q);
  console.log(`Question ${question.id} edited`);

  return {
    message: `Question ${question.id} edited`,
    success: true,
    payload: q,
  };
};
