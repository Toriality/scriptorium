import { GetCategories } from "../../../types";
import { count, findDatabase, select } from "../../../database";
import { Category, CategoryData } from "@/features/categories";

export const getCategories: GetCategories = async (subject) => {
  const db = findDatabase(subject);
  const categories = (await select(db, "categories")) as Category[];
  const categoriesData: CategoryData[] = [];

  for (const category of categories) {
    const numberOfQuestions = await count(db, "questions", {
      category_id: category.id,
    });
    const numberOfTests = await count(db, "tests", {
      category_id: category.id,
    });

    categoriesData.push({
      category,
      numberOfQuestions,
      numberOfTests,
    });
  }

  return categoriesData;
};
