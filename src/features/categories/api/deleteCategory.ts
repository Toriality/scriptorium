import { CategoryData } from "..";

export const deleteCategory = async (
  subject: string,
  categoryData: CategoryData,
) => {
  return await window.ipcRenderer.deleteCategory(subject, categoryData);
};
