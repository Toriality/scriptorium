export const getQuestion = async (subject: string, question_id: number) => {
  return await window.ipcRenderer.getQuestion(subject, question_id);
};
