import { SubjectData } from "../types";

export const deleteSubject = async (subjectData: SubjectData) => {
  return await window.ipcRenderer.deleteSubject(subjectData);
};
