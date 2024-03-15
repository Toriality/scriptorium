import { Category } from "@/features/categories";
import { findDatabase, select } from "../../../database";
import { GetCategory } from "../../../types";

export const getCategory: GetCategory = async (subject, category_id) => {
  const db = findDatabase(subject);

  const category: Category = (await select(
    db,
    "categories",
    {
      id: category_id,
    },
    true,
  )) as Category;

  return category;
};
