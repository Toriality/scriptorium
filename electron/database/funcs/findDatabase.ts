import { openedDatabases } from "..";

export const findDatabase = (subject: string) => {
  const db = openedDatabases.find((element) => element.name === subject)?.db;

  if (!db) {
    throw new Error(`No database found for subject ${subject}`);
  }

  return db;
};
