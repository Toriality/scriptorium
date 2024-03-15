import { contextBridge, ipcRenderer } from "electron";
import { IpcMethods } from "./types";

const ipcRendererCustomMethods: IpcMethods = {
  getSubjects() {
    return ipcRenderer.invoke("getSubjects");
  },
  getSubject(subject) {
    return ipcRenderer.invoke("getSubject", subject);
  },
  createSubject(subject) {
    return ipcRenderer.invoke("createSubject", subject);
  },
  editSubject(oldSubject, newSubject) {
    return ipcRenderer.invoke("editSubject", oldSubject, newSubject);
  },
  deleteSubject(subjectData) {
    return ipcRenderer.invoke("deleteSubject", subjectData);
  },

  getCategories(subject) {
    return ipcRenderer.invoke("getCategories", subject);
  },
  getCategory(subject, category_id) {
    return ipcRenderer.invoke("getCategory", subject, category_id);
  },
  createCategory(subject, category) {
    return ipcRenderer.invoke("createCategory", subject, category);
  },
  editCategory(subject, oldCategory, newCategory) {
    return ipcRenderer.invoke(
      "editCategory",
      subject,
      oldCategory,
      newCategory,
    );
  },
  deleteCategory(subject, categoryData) {
    return ipcRenderer.invoke("deleteCategory", subject, categoryData);
  },

  getTags(subject, ids) {
    return ipcRenderer.invoke("getTags", subject, ids);
  },
  addTag(subject, tagname) {
    return ipcRenderer.invoke("addTag", subject, tagname);
  },
  deleteTag(subject, tag) {
    return ipcRenderer.invoke("deleteTag", subject, tag);
  },

  getQuestions(subject, category_id) {
    return ipcRenderer.invoke("getQuestions", subject, category_id);
  },
  getQuestion(subject, question_id) {
    return ipcRenderer.invoke("getQuestion", subject, question_id);
  },
  createQuestion(subject, question) {
    return ipcRenderer.invoke("createQuestion", subject, question);
  },
  editQuestion(subject, question) {
    return ipcRenderer.invoke("editQuestion", subject, question);
  },
  deleteQuestion(subject, question) {
    return ipcRenderer.invoke("deleteQuestion", subject, question);
  },

  getTests(subject, category_id) {
    return ipcRenderer.invoke("getTests", subject, category_id);
  },
  getTest(subject, test_id) {
    return ipcRenderer.invoke("getTest", subject, test_id);
  },
  createCustomTest(subject, test) {
    return ipcRenderer.invoke("createCustomTest", subject, test);
  },
  createRandomTest(subject, test) {
    return ipcRenderer.invoke("createRandomTest", subject, test);
  },
  deleteTest(subject, test) {
    return ipcRenderer.invoke("deleteTest", subject, test);
  },
  submitTest(subject, test) {
    return ipcRenderer.invoke("submitTest", subject, test);
  },
};

contextBridge.exposeInMainWorld("ipcRenderer", {
  ...ipcRendererCustomMethods,
  sendQuit: () => ipcRenderer.send("quit"),
  sendMinimize: () => ipcRenderer.send("minimize"),
  sendMaximize: () => ipcRenderer.send("maximize"),
  openSubjectsFolder: () => ipcRenderer.send("openSubjectsFolder"),
});
