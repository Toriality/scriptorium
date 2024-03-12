import { Subject } from "@/features/subjects";
import { findDatabase, select } from "../../../database";
import { Category, CategoryForm } from "@/features/categories";
import { insert } from "../../../database/funcs/insert";
import { CreateCategory } from "../../../types";

export const createCategory: CreateCategory = async (
  subject: Subject,
  category: CategoryForm,
) => {
  const db = findDatabase(subject);
  const id = await insert(db, "categories", category);
  const newCategory = (await select(
    db,
    "categories",
    { id },
    true,
  )) as Category;

  console.log(newCategory);
  console.log(`Category ${newCategory.name} created`);
  return {
    success: true,
    message: "Category created successfully",
    payload: newCategory,
  };
};
