export const getCategories = async (subject: string) => {
  return await window.ipcRenderer.getCategories(subject);
};
