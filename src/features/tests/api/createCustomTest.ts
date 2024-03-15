import { CustomTestFormType } from "..";

export const createCustomTest = async (
  subject: string,
  test: CustomTestFormType,
) => {
  return await window.ipcRenderer.createCustomTest(subject, test);
};
