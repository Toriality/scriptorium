import { QuestionFormType } from "..";

export const editQuestion = async (
  subject: string,
  question: QuestionFormType,
) => {
  return await window.ipcRenderer.editQuestion(subject, question);
};
