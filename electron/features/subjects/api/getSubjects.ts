import { SubjectData } from "@/features/subjects";
import { GetSubjects } from "electron/types";
import { count, openedDatabases } from "../../../database/";

export const getSubjects: GetSubjects = async () => {
  const subjects: SubjectData[] = [];

  for (const entry of openedDatabases) {
    const numberOfTags = await count(entry.db, "tags");
    const numberOfCategories = await count(entry.db, "categories");

    subjects.push({
      subject: entry.name,
      numberOfTags: numberOfTags,
      numberOfCategories: numberOfCategories,
    });
  }

  console.log(`Got ${subjects.length} subjects`);
  return subjects;
};
