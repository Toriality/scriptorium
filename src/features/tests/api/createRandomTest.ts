import { RandomTestFormType } from "../types";

export const createRandomTest = async (
  subject: string,
  data: RandomTestFormType,
) => {
  return await window.ipcRenderer.createRandomTest(subject, data);
};
