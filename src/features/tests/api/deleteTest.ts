import { Test } from "..";

export const deleteTest = async (subject: string, test: Test) => {
  return await window.ipcRenderer.deleteTest(subject, test);
};
