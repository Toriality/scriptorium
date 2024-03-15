export const getSubject = async (subject: string) => {
  return await window.ipcRenderer.getSubject(subject);
};
