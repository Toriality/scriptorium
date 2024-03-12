import fs from "node:fs";
import path from "node:path";
import { subjectsPath, openedDatabases, sortOpenedDatabases } from "..";
import { initializeDatabase } from "../utils/initializeDatabase";

export const loadDatabases = () => {
  if (!subjectsPath) throw new Error("Missing environment variables");

  for (const file of fs.readdirSync(subjectsPath)) {
    if (file.endsWith(".db")) {
      const fullFilePath = path.join(subjectsPath, file);
      openedDatabases.push({
        name: file.split(".")[0],
        db: initializeDatabase(fullFilePath),
        mtime: fs.statSync(fullFilePath).mtime.getTime(),
      });
    }
  }

  sortOpenedDatabases();
  console.log(`Finished loading ${openedDatabases.length} databases`);
};
