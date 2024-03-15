import { Database } from "sqlite3";

export const select = <T>(
  db: Database,
  table: string,
  condition?: {
    [key: string]: string | number | Array<number>;
  },
  single: boolean = false,
): Promise<T | T[]> => {
  let queryString = `SELECT * FROM ${table}`;
  let queryParams: (string | number)[] = [];

  if (condition) {
    const conditionField = Object.keys(condition)[0];
    const conditionValue = condition[conditionField];

    // Handling multiple values for a condition
    if (Array.isArray(conditionValue)) {
      const placeholders = conditionValue.map(() => "?").join(", ");
      queryString += ` WHERE ${conditionField} IN (${placeholders})`;
      queryParams = conditionValue;
    } else {
      queryString += ` WHERE ${conditionField} = ?`;
      queryParams = [conditionValue];
    }
  }

  return new Promise((resolve, reject) => {
    db.all(queryString, queryParams, function (err, rows: T[]) {
      if (err) {
        reject(err);
      } else {
        resolve(single ? rows[0] : rows);
      }
    });
  });
};
