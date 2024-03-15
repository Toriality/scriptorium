import { CategoryForm } from "..";

export const createCategory = async (
  subject: string,
  category: CategoryForm,
) => {
  return await window.ipcRenderer.createCategory(subject, category);
};
