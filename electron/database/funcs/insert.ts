import { Database } from "sqlite3";

export const insert = (db: Database, table: string, values: object) => {
  return new Promise<number>((resolve, reject) => {
    const columns = Object.keys(values).join(", ");
    const placeholders = Object.values(values)
      .map(() => "?")
      .join(", ");
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    db.run(query, Object.values(values), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};
