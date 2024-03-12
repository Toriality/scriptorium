import { findDatabase } from "../../../database";
import { update } from "../../../database/funcs/update";
import { SubmitTest } from "../../../types";

export const submitTest: SubmitTest = async (subject, test) => {
  const db = findDatabase(subject);

  await update(db, "tests", test.id, {
    ...test,
    completed: 1,
  });

  return {
    message: "Test submitted!",
    success: true,
  };
};
