import { QuestionDatabaseType } from "@/features/questions";
import { DeleteTag } from "../../../types";
import { Subject } from "@/features/subjects";
import { Tag } from "@/features/tags";
import { findDatabase, select } from "../../../database";
import { del } from "../../../database/funcs/del";
import { safelyDeleteData } from "../../../utils/safelyDeleteData";
import { DIALOG_MESSAGES } from "../../../utils/dialogMessages";
import { update } from "../../../database/funcs/update";

export const deleteTag: DeleteTag = async (subject: Subject, tag: Tag) => {
  const db = findDatabase(subject);

  const unformattedQuestions = (await select(
    db,
    "questions",
  )) as QuestionDatabaseType[];
  const formattedQuestions = [];

  for (const question of unformattedQuestions) {
    formattedQuestions.push({
      ...question,
      tags: (JSON.parse(question.tags) || []) as number[],
    });
  }

  const associatedQuestions = formattedQuestions.filter((q) =>
    q.tags.includes(tag.id),
  );

  return safelyDeleteData({
    condition: associatedQuestions.length > 0,
    dialogMessage: DIALOG_MESSAGES.DELETE_TAG(
      tag.name,
      associatedQuestions.length,
    ),
    onSuccess: async () => {
      for (const question of associatedQuestions) {
        question.tags = question.tags.filter((t) => t !== tag.id);

        await update(db, "questions", question.id, {
          ...question,
          tags: JSON.stringify(question.tags),
        });
        console.log(`Tag ${tag.name} removed from question ${question.id}`);
      }

      await del(db, "tags", tag.id);
      console.log(`Tag ${tag.name} removed`);
    },
  });
};
