import { findDatabase } from "../../../database";
import { del } from "../../../database/funcs/del";
import { DeleteTest } from "../../../types";

export const deleteTest: DeleteTest = async (subject, test) => {
  const db = findDatabase(subject);

  await del(db, "tests", test.id);

  console.log(`Test ${test.id} removed`);
  return {
    message: "Test removed",
    success: true,
  };
};
