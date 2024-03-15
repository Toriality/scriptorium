import { QuestionDatabaseType } from "..";

export const deleteQuestion = async (
  subject: string,
  question: QuestionDatabaseType,
) => {
  return await window.ipcRenderer.deleteQuestion(subject, question);
};
