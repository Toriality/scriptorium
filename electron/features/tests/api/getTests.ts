import { select } from "../../../database";
import { findDatabase } from "../../../database";
import { GetTests } from "../../../types";
import { Test } from "@/features/tests";

export const getTests: GetTests = async (subject, category_id) => {
  const db = findDatabase(subject);
  const tests = (await select(db, "tests", { category_id })) as Test[];

  return tests;
};
