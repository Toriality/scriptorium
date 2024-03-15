export const addTag = async (subject: string, tag: string) => {
  return await window.ipcRenderer.addTag(subject, tag);
};
