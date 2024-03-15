import { select } from "../../../database";
import { findDatabase } from "../../../database";
import { Subject } from "@/features/subjects";
import { Tag } from "@/features/tags";
import { GetTags } from "../../../types";

export const getTags: GetTags = async (subject: Subject, ids?: number[]) => {
  const db = findDatabase(subject);

  if (ids) {
    return (await select(db, "tags", { id: ids })) as Tag[];
  }

  const tags = (await select(db, "tags")) as Tag[];

  return tags;
};
