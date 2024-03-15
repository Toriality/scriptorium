import { Question, QuestionDatabaseType } from "../types";

export const convert = (question: QuestionDatabaseType): Question => {
  return {
    id: question.id,
    category_id: question.category_id,
    text: question.text,
    options: JSON.parse(question.options),
    answer: question.answer,
    tags: JSON.parse(question.tags),
  } as Question;
};
