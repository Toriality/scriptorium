export const createSubject = async (subject: string) => {
  return await window.ipcRenderer.createSubject(subject);
};
