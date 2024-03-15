import { Test } from "@/features/tests";
import { findDatabase, select } from "../../../database";
import { GetTest } from "../../../types";

export const getTest: GetTest = async (subject, test_id) => {
  const db = findDatabase(subject);

  const test = (await select(db, "tests", { id: test_id }, true)) as Test;

  return test;
};
