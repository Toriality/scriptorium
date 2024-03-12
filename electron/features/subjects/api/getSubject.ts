import { GetSubject } from "../../../types";
import { Category } from "@/features/categories";
import { Tag } from "@/features/tags";
import { count, findDatabase, select } from "../../../database";
import { CurrentSubjectData } from "@/features/subjects";

export const getSubject: GetSubject = async (subject) => {
  const db = findDatabase(subject);

  const tags = (await select(db, "tags")) as Tag[];
  const categories = (await select(db, "categories")) as Category[];

  const currentSubjectData: CurrentSubjectData = {
    subject,
    tags,
    categories: [],
  };

  for (const category of categories) {
    const nq = await count(db, "questions", {
      category_id: category.id,
    });
    const nt = await count(db, "tests", {
      category_id: category.id,
    });

    currentSubjectData.categories.push({
      category,
      numberOfQuestions: nq,
      numberOfTests: nt,
    });
  }

  return currentSubjectData;
};
