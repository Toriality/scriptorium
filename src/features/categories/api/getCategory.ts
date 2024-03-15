export const getCategory = async (subject: string, category_id: number) => {
  return await window.ipcRenderer.getCategory(subject, category_id);
};
