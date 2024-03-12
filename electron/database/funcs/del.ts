import { Database } from "sqlite3";

export const del = async (db: Database, table: string, id: number) => {
  return new Promise<void>((resolve, reject) => {
    db.run(`DELETE FROM ${table} WHERE id = ?`, id, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
