import fs from "node:fs";
import {
  findDatabase,
  renameOpenedDatabase,
  subjectsPath,
} from "../../../database";
import { EditSubject } from "../../../types";

export const editSubject: EditSubject = async (oldSubject, newSubject) => {
  const db = findDatabase(oldSubject);

  db.close(() => {
    fs.renameSync(
      `${subjectsPath}/${oldSubject}.db`,
      `${subjectsPath}/${newSubject}.db`,
    );

    renameOpenedDatabase(oldSubject, newSubject);
  });

  console.log(`Subject ${oldSubject} renamed to ${newSubject}`);
  return {
    message: "Subject renamed",
    success: true,
  };
};
