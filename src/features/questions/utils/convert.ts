import { QuestionDatabaseType, QuestionFormType } from "../types";

export const convert = (question: QuestionDatabaseType): QuestionFormType => {
  return {
    id: question.id,
    category_id: question.category_id,
    text: question.text,
    options: JSON.parse(question.options),
    answer: question.answer,
    tags: JSON.parse(question.tags),
  };
};
