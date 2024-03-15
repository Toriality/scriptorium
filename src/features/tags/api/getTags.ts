export const getTags = async (subject: string, ids?: number[]) => {
  return await window.ipcRenderer.getTags(subject, ids);
};
