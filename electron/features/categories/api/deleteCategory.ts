import { CategoryData } from "@/features/categories";
import { Subject } from "@/features/subjects";
import { findDatabase } from "../../../database";
import { del } from "../../../database/funcs/del";
import { DIALOG_MESSAGES } from "../../../utils/dialogMessages";
import { safelyDeleteData } from "../../../utils/safelyDeleteData";
import { DeleteCategory } from "electron/types";

export const deleteCategory: DeleteCategory = async (
  subject: Subject,
  categoryData: CategoryData,
) => {
  return safelyDeleteData({
    condition:
      categoryData.numberOfQuestions > 0 || categoryData.numberOfTests > 0,
    dialogMessage: DIALOG_MESSAGES.DELETE_CATEGORY(
      categoryData.category.name,
      categoryData.numberOfQuestions,
      categoryData.numberOfTests,
    ),
    onSuccess: async () => {
      const db = findDatabase(subject);
      await del(db, "categories", categoryData.category.id);
      console.log(`Category ${categoryData.category.name} removed`);
    },
  });
};
