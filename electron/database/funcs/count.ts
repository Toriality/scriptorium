import { Database } from "sqlite3";

export const count = async (
  db: Database,
  table: string,
  condition?: { [key: string]: string | number },
) => {
  const conditionField = condition && Object.keys(condition)[0];
  const conditionValue = condition && Object.values(condition)[0];
  return new Promise<number>((resolve, reject) => {
    db.get(
      `SELECT COUNT(*) FROM ${table} ${condition && `WHERE ${conditionField} = (${conditionValue})`}`,
      function (err, row: { "COUNT(*)": number }) {
        if (err) {
          reject(err);
        } else {
          resolve(row["COUNT(*)"]);
        }
      },
    );
  });
};
