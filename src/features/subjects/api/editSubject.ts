export const editSubject = async (
  previewSubject: string,
  newSubject: string,
) => {
  return await window.ipcRenderer.editSubject(previewSubject, newSubject);
};
