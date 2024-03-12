import { Category } from "@/features/categories";
import { findDatabase, select } from "../../../database";
import { GetCategory } from "../../../types";
import { QuestionDatabaseType } from "@/features/questions";
import { Test } from "@/features/tests";

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
  const questions = (await select(db, "questions", {
    category_id: category_id,
  })) as QuestionDatabaseType[];
  const tests = (await select(db, "tests", {
    category_id: category_id,
  })) as Test[];

  return {
    category,
    questions,
    tests,
  };
};
