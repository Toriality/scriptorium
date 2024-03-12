import { QuestionDatabaseType } from "@/features/questions";
import { Subject } from "@/features/subjects";
import { Test } from "@/features/tests";
import { findDatabase, select } from "../../../database";
import { del } from "../../../database/funcs/del";
import { DeleteQuestion } from "../../../types";
import { DIALOG_MESSAGES } from "../../../utils/dialogMessages";
import { safelyDeleteData } from "../../../utils/safelyDeleteData";

export const deleteQuestion: DeleteQuestion = async (
  subject: Subject,
  question: QuestionDatabaseType,
) => {
  const db = findDatabase(subject);

  const unformattedTests = (await select(db, "tests")) as Test[];
  const formattedQuestions = [];

  for (const test of unformattedTests) {
    formattedQuestions.push({
      ...test,
      questions: (JSON.parse(test.questions) || []) as number[],
    });
  }

  const associatedTests = formattedQuestions.filter((q) =>
    q.questions.includes(question.id),
  );

  return safelyDeleteData({
    condition: associatedTests.length > 0,
    dialogMessage: DIALOG_MESSAGES.DELETE_QUESTION(associatedTests.length),
    onSuccess: async () => {
      for (const test of associatedTests) {
        await del(db, "tests", test.id);
        console.log(
          `Test ${test.id} was removed because of the deletion of question ${question.id}`,
        );
      }
      await del(db, "questions", question.id);
      console.log(`Question ${question.id} removed`);
    },
    returnPayload: associatedTests.map((t) => t.id),
  });
};
