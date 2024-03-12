import { Subject } from "@/features/subjects";
import { Tag } from "@/features/tags";
import { findDatabase, select } from "../../../database";
import { insert } from "../../../database/funcs/insert";
import { AddTAg } from "../../../types";

export const addTag: AddTAg = async (
  subject: Subject,
  tagname: string,
): Promise<Tag> => {
  const db = findDatabase(subject);
  const id = await insert(db, "tags", { name: tagname });
  const tag = (await select(db, "tags", { id }, true)) as Tag;
  return tag;
};
