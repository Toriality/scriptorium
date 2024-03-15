export const getTests = async (subject: string, category_id: number) => {
  return await window.ipcRenderer.getTests(subject, category_id);
};
