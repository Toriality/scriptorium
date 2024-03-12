import { CreateCustomTest } from "../../../types";
import { Test } from "@/features/tests";
import { findDatabase, select } from "../../../database";
import { insert } from "../../../database/funcs/insert";

export const createCustomTest: CreateCustomTest = async (subject, test) => {
  const db = findDatabase(subject);

  const testDb = {
    ...test,
    questions: JSON.stringify(test.questions),
  };

  const id = await insert(db, "tests", testDb);
  const newTest = (await select(db, "tests", { id }, true)) as Test;

  console.log(`Test ${newTest.id} created`);
  return {
    message: "Test created",
    success: true,
    payload: newTest,
  };
};
