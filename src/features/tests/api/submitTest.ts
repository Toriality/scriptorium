import { Test } from "..";

export const submitTest = async (subject: string, test: Test) => {
  return await window.ipcRenderer.submitTest(subject, test);
};
