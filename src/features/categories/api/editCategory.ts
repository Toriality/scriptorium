import { Category } from "..";

export const editCategory = async (
  subject: string,
  oldCategory: Category,
  newCategory: Category,
) => {
  return await window.ipcRenderer.editCategory(
    subject,
    oldCategory,
    newCategory,
  );
};
