import fs from "node:fs";
import { safelyDeleteData } from "../../../utils/safelyDeleteData";
import { SubjectData } from "@/features/subjects";
import { DIALOG_MESSAGES } from "../../../utils/dialogMessages";
import {
  findDatabase,
  removeOpenedDatabase,
  subjectsPath,
} from "../../../database";
import { DeleteSubject } from "electron/types";

export const deleteSubject: DeleteSubject = async (
  subjectData: SubjectData,
) => {
  return safelyDeleteData({
    condition:
      subjectData.numberOfTags > 0 || subjectData.numberOfCategories > 0,
    dialogMessage: DIALOG_MESSAGES.DELETE_SUBJECT(
      subjectData.subject,
      subjectData.numberOfCategories,
      subjectData.numberOfTags,
    ),
    onSuccess: async () => {
      const db = findDatabase(subjectData.subject);
      return new Promise<void>((resolve, reject) => {
        db.close((err) => {
          if (err) reject(err);
          fs.unlinkSync(`${subjectsPath}/${subjectData.subject}.db`);
          removeOpenedDatabase(subjectData.subject);
          resolve();
        });
        console.log(`Subject ${subjectData.subject} removed`);
      });
    },
  });
};
