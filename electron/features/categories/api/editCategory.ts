import { update } from "../../..//database/funcs/update";
import { findDatabase } from "../../../database";
import { EditCategory } from "../../../types";

export const editCategory: EditCategory = async (
  subject,
  category,
  newCategory,
) => {
  const db = findDatabase(subject);
  await update(db, "categories", newCategory.id, newCategory);

  console.log(`Category ${category.name} edited`);
  return {
    success: true,
    message: "Category edited successfully.",
  };
};
