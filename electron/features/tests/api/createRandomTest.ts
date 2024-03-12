import { QuestionDatabaseType } from "@/features/questions";
import { Test } from "@/features/tests";
import { findDatabase, select } from "../../../database";
import { insert } from "../../../database/funcs/insert";
import { CreateRandomTest } from "../../../types";

export const createRandomTest: CreateRandomTest = async (subject, test) => {
  const db = findDatabase(subject);

  const unformattedQuestions = (await select(
    db,
    "questions",
  )) as QuestionDatabaseType[];
  const foundQuestions: number[] = [];

  for (const question of unformattedQuestions) {
    const formattedQuestion = {
      ...question,
      tags: JSON.parse(question.tags) || [],
    };

    if (
      formattedQuestion.tags.length === 0 || // If no tags were selected, include all questions
      formattedQuestion.tags.some((t: number) => test.tags.includes(t))
    ) {
      foundQuestions.push(formattedQuestion.id);
    }
  }

  const randomlyPickedQuestions: number[] = foundQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, test.numberOfQuestions);

  const id = await insert(db, "tests", {
    category_id: test.category_id,
    name: test.name,
    questions: JSON.stringify(randomlyPickedQuestions),
  });
  const newTest = (await select(db, "tests", { id }, true)) as Test;

  console.log(`Test ${newTest.id} created`);
  return {
    message: "Test created",
    success: true,
    payload: newTest,
  };
};
