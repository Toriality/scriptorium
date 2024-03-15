export const getQuestions = async (
  subject: string,
  category_id: number,
  ids?: number[],
) => {
  return await window.ipcRenderer.getQuestions(subject, category_id, ids);
};
