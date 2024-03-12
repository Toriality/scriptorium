import fs from "node:fs";
import { Database } from "sqlite3";
import { initializeDatabase } from "./utils/initializeDatabase";

type OpenedDatabase = {
  name: string;
  db: Database;
  mtime: number;
};

export let subjectsPath: string | null = null;
export let openedDatabases: OpenedDatabase[] = [];

export const setSubjectsPath = (value: string) => {
  if (!fs.existsSync(value)) {
    fs.mkdirSync(value, { recursive: true });
    console.log(`Created subjects directory: ${value}`);
  }
  subjectsPath = value;
};

export const sortOpenedDatabases = () => {
  openedDatabases = openedDatabases.sort((a, b) => {
    return b.mtime - a.mtime;
  });
};

export const renameOpenedDatabase = (
  oldSubject: string,
  newSubject: string,
) => {
  openedDatabases = openedDatabases.map((element) => {
    if (element.name === oldSubject) {
      element.name = newSubject;
      element.db = initializeDatabase(`${subjectsPath}/${newSubject}.db`);
    }
    return element;
  });
};

export const removeOpenedDatabase = (subject: string) => {
  openedDatabases = openedDatabases.filter(
    (element) => element.name !== subject,
  );
};

export * from "./funcs/count";
export * from "./funcs/select";
export * from "./funcs/findDatabase";
export * from "./funcs/loadDatabases";
