import {
  openedDatabases,
  sortOpenedDatabases,
  subjectsPath,
} from "../../../database";
import { CreateSubject } from "../../../types";
import fs from "node:fs";
import path from "node:path";
import { Subject } from "@/features/subjects";
import { initializeDatabase } from "../../../database/utils/initializeDatabase";

export const createSubject: CreateSubject = async (subjectFormData) => {
  if (!subjectsPath) throw new Error("Subjects path not set");

  const fullFilePath = path.join(subjectsPath, `${subjectFormData}.db`);
  fs.writeFileSync(fullFilePath, "");
  loadDatabase(subjectFormData, fullFilePath);

  console.log(`Subject ${subjectFormData} created`);
  return {
    message: "Subject created successfully",
    success: true,
  };
};

function loadDatabase(subject: Subject, fullFilePath: string) {
  openedDatabases.push({
    name: subject,
    db: initializeDatabase(fullFilePath),
    mtime: fs.statSync(fullFilePath).mtime.getTime(),
  });

  sortOpenedDatabases();
}
