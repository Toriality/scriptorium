import { Database } from "sqlite3";

export const select = <T>(
  db: Database,
  table: string,
  condition?: {
    [key: string]: string | number;
  },
  single: boolean = false,
): Promise<T | T[]> => {
  const conditionField = condition && Object.keys(condition)[0];
  const conditionValue = condition && Object.values(condition)[0];

  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM ${table} ${condition && `WHERE ${conditionField} = ?`}`,
      [conditionValue],
      function (err, rows: T[]) {
        if (err) {
          reject(err);
        } else {
          resolve(single ? rows[0] : rows);
        }
      },
    );
  });
};
