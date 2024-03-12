import path from "path";
import { app, ipcMain, shell } from "electron";
import { win } from "../app";
import { getSubjects, getSubject } from "../features/subjects";
import { createSubject } from "../features/subjects/api/createSubject";
import { editSubject } from "../features/subjects/api/editSubject";
import { deleteSubject } from "../features/subjects/api/deleteSubject";
import { getCategory } from "../features/categories/api/getCategory";
import { createCategory } from "../features/categories/api/createCategory";
import { editCategory } from "../features/categories/api/editCategory";
import { deleteCategory } from "../features/categories/api/deleteCategory";
import { addTag } from "../features/tags/api/addTag";
import { deleteTag } from "../features/tags/api/deleteTag";
import { createQuestion } from "../features/questions/api/createQuestion";
import { editQuestion } from "../features/questions/api/editQuestion";
import { deleteQuestion } from "../features/questions/api/deleteQuestion";
import { createCustomTest } from "../features/tests/api/createCustomTest";
import { createRandomTest } from "../features/tests/api/createRandomTest";
import { deleteTest } from "../features/tests/api/deleteTest";
import { submitTest } from "../features/tests/api/submitTest";

export const configureIpc = () => {
  ipcMain.on("quit", () => close());
  ipcMain.on("minimize", () => minimize());
  ipcMain.on("maximize", () => maximize());
  ipcMain.on("openSubjectsFolder", () => openSubjectsFolder());

  ipcMain.handle("getSubjects", getSubjects);
  ipcMain.handle("getSubject", (_, subject) => getSubject(subject));
  ipcMain.handle("createSubject", (_, subjectFormData) =>
    createSubject(subjectFormData),
  );
  ipcMain.handle("editSubject", (_, oldSubject, newSubject) =>
    editSubject(oldSubject, newSubject),
  );
  ipcMain.handle("deleteSubject", (_, subject) => deleteSubject(subject));
  ipcMain.handle("getCategory", (_, subject, category_id) =>
    getCategory(subject, category_id),
  );
  ipcMain.handle("createCategory", (_, subject, category) =>
    createCategory(subject, category),
  );
  ipcMain.handle("editCategory", (_, subject, Category, newCategoryName) =>
    editCategory(subject, Category, newCategoryName),
  );
  ipcMain.handle("deleteCategory", (_, subject, categoryData) =>
    deleteCategory(subject, categoryData),
  );
  ipcMain.handle("addTag", (_, subject, tagname) => addTag(subject, tagname));
  ipcMain.handle("deleteTag", (_, subject, tag) => deleteTag(subject, tag));
  ipcMain.handle("createQuestion", (_, subject, question) =>
    createQuestion(subject, question),
  );
  ipcMain.handle("editQuestion", (_, subject, question) =>
    editQuestion(subject, question),
  );
  ipcMain.handle("deleteQuestion", (_, subject, question) =>
    deleteQuestion(subject, question),
  );
  ipcMain.handle("createCustomTest", (_, subject, test) =>
    createCustomTest(subject, test),
  );
  ipcMain.handle("createRandomTest", (_, subject, test) =>
    createRandomTest(subject, test),
  );
  ipcMain.handle("deleteTest", (_, subject, test) => deleteTest(subject, test));
  ipcMain.handle("submitTest", (_, subject, test) => submitTest(subject, test));
};

function close() {
  app.quit();
}

function minimize() {
  win!.minimize();
}

function maximize() {
  if (win?.isMaximized()) win?.unmaximize();
  else win?.maximize();
}

function openSubjectsFolder() {
  const subjectsPath = path.join(app.getPath("userData"), "subjects");
  shell.openPath(subjectsPath);
}
