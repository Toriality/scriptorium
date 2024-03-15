import { QuestionFormType } from "..";

export const createQuestion = async (
  subject: string,
  question: QuestionFormType,
) => {
  return await window.ipcRenderer.createQuestion(subject, question);
};
