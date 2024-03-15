export const getSubjects = async () => {
  return await window.ipcRenderer.getSubjects();
};
