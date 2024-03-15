export const getTest = async (subject: string, test_id: number) => {
  return await window.ipcRenderer.getTest(subject, test_id);
};
