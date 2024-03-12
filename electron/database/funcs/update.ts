import { Database } from "sqlite3";

export const update = (
  db: Database,
  table: string,
  id: number,
  values: object,
) => {
  return new Promise<void>((resolve, reject) => {
    const columns = Object.keys(values);
    const updateValues = Object.values(values);
    const updateSetClause = columns.map((col) => `${col} = ?`).join(", ");

    db.run(
      `UPDATE ${table} SET ${updateSetClause} WHERE id = ?`,
      [...updateValues, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};
