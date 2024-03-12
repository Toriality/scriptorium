import fs from "node:fs";
import { Database } from "sqlite3";

/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite3 = require("sqlite3").verbose();

export const initializeDatabase = (fullFilePath: string) => {
  const db: Database = new sqlite3.Database(fullFilePath);
  const fileBuffer = fs.readFileSync(fullFilePath);

  if (fileBuffer.byteLength === 0) {
    console.log(`Detected new database: ${fullFilePath}`);
    db.serialize(() => {
      createCategoriesTable(db);
      createQuestionsTable(db);
      createTestsTable(db);
      createTagsTable(db);
    });
    return db;
  }

  console.log(`Loaded database: ${fullFilePath}`);
  return db;
};

function createCategoriesTable(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS categories
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT
    )`,
  );
}

function createQuestionsTable(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS questions
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        text TEXT NOT NULL,
        options TEXT NOT NULL,
        answer INTEGER NOT NULL,
        tags TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`,
  );
}

function createTestsTable(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS tests
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        questions TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        answers TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`,
  );
}

function createTagsTable(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS tags
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`,
  );
}
