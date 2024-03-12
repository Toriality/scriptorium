import { Subject, SubjectData } from "@/features/subjects";
import { Category, CategoryData, CategoryForm } from "@/features/categories";
import { QuestionDatabaseType, QuestionFormType } from "@/features/questions";
import { Tag } from "@/features/tags";
import { createContext, useEffect, useReducer } from "react";
import { dataReducer } from "./dataReducer";
import { DataActions, DataState } from "./types";
import { Test, CustomTestFormType, RandomTestFormType } from "@/features/tests";

interface DataContextProps {
  state: DataState;
  actions: DataActions;
}

const initialState = () => {
  return localStorage.getItem("data")
    ? (JSON.parse(localStorage.getItem("data")!) as DataState)
    : { current: { subject: null, category: null }, subjects: null };
};

export const DataContext = createContext<DataContextProps | undefined>(
  undefined,
);

export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataReducer, initialState());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  const actions = {
    leaveAllCurrentData: () => {
      dispatch({ type: "LEAVE_ALL_CURRENT_DATA" });
    },
    leaveCurrentCategoryData: () => {
      dispatch({ type: "LEAVE_CURRENT_CATEGORY_DATA" });
    },

    setCurrentSubject: async (subject: Subject) => {
      if (!state.subjects) throw new Error("Subjects not loaded");
      const current = await window.ipcRenderer.getSubject(subject);
      dispatch({ type: "SET_CURRENT_SUBJECT", payload: current });
    },
    setSubjects: async () => {
      const subjects = await window.ipcRenderer.getSubjects();
      dispatch({ type: "SET_SUBJECTS", payload: subjects });
    },
    createSubject: async (subject: Subject) => {
      const result = await window.ipcRenderer.createSubject(subject);
      if (!result.success) throw new Error(result.message);
      dispatch({ type: "CREATE_SUBJECT", payload: subject });
      return result;
    },
    editSubject: async (oldSubject: SubjectData, newSubject: SubjectData) => {
      if (!state.subjects) throw new Error("Subjects not loaded");
      const result = await window.ipcRenderer.editSubject(
        oldSubject.subject,
        newSubject.subject,
      );
      if (!result.success) throw new Error(result.message);
      dispatch({ type: "EDIT_SUBJECT", payload: { oldSubject, newSubject } });
    },
    deleteSubject: async (subject: SubjectData) => {
      if (!state.subjects) throw new Error("Subjects not loaded");
      const prompt = await window.ipcRenderer.deleteSubject(subject);
      if (!prompt.success) return console.warn(prompt.message);
      dispatch({ type: "DELETE_SUBJECT", payload: subject });
    },

    setCurrentCategory: async (category_id: number) => {
      if (!state.subjects || !state.current.subject)
        throw new Error("Subjects not loaded");
      const current = await window.ipcRenderer.getCategory(
        state.current.subject!.subject,
        category_id,
      );
      console.log(current);
      dispatch({ type: "SET_CURRENT_CATEGORY", payload: current });
    },
    createCategory: async (category: CategoryForm) => {
      const result = await window.ipcRenderer.createCategory(
        state.current.subject!.subject,
        category,
      );
      if (!result.success) throw new Error(result.message);
      dispatch({ type: "CREATE_CATEGORY", payload: result.payload! });
      return result.payload!;
    },
    editCategory: async (oldCategory: Category, newCategory: Category) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const result = await window.ipcRenderer.editCategory(
        state.current.subject.subject,
        oldCategory,
        newCategory,
      );
      if (!result.success) throw new Error(result.message);
      dispatch({
        type: "EDIT_CATEGORY",
        payload: { oldCategory, newCategory },
      });
    },
    deleteCategory: async (category: CategoryData) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.deleteCategory(
        state.current.subject.subject,
        category,
      );
      if (!prompt.success) return console.warn(prompt.message);
      dispatch({ type: "DELETE_CATEGORY", payload: category });
    },

    getTags: (tags: number[]) => {
      if (!state.current.subject) throw new Error("Subject not set");
      return state.current.subject.tags.filter((tag: Tag) =>
        tags.includes(tag.id),
      );
    },
    addTag: async (tagname: string) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const newTag = await window.ipcRenderer.addTag(
        state.current.subject.subject,
        tagname,
      );
      dispatch({ type: "ADD_TAG", payload: { tag: newTag } });
    },
    deleteTag: async (tag: Tag) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.deleteTag(
        state.current.subject.subject,
        tag,
      );
      if (!prompt.success) return console.warn(prompt.message);
      dispatch({ type: "DELETE_TAG", payload: { tag } });
    },

    getQuestions: (questions: number[]) => {
      if (!state.current.category) throw new Error("Category not set");
      return state.current.category.questions.filter(
        (question: QuestionDatabaseType) => questions.includes(question.id),
      );
    },
    createQuestion: async (question: QuestionFormType) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.createQuestion(
        state.current.subject.subject,
        question,
      );
      if (!prompt.success) throw new Error(prompt.message);
      dispatch({ type: "CREATE_QUESTION", payload: prompt.payload! });
      return prompt.payload!;
    },
    editQuestion: async (question: QuestionFormType) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.editQuestion(
        state.current.subject.subject,
        question,
      );
      if (!prompt.success) throw new Error(prompt.message);
      dispatch({ type: "EDIT_QUESTION", payload: prompt.payload! });
    },
    deleteQuestion: async (question: QuestionDatabaseType) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.deleteQuestion(
        state.current.subject.subject,
        question,
      );
      if (!prompt.success) return console.warn(prompt.message);
      dispatch({
        type: "DELETE_QUESTION",
        payload: { question, associatedTests: prompt.payload! },
      });
    },

    createCustomTest: async (test: CustomTestFormType) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.createCustomTest(
        state.current.subject.subject,
        test,
      );
      if (!prompt.success) throw new Error(prompt.message);
      dispatch({ type: "CREATE_TEST", payload: prompt.payload! });
      return prompt.payload!;
    },
    createRandomTest: async (test: RandomTestFormType) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.createRandomTest(
        state.current.subject.subject,
        test,
      );
      if (!prompt.success) throw new Error(prompt.message);
      dispatch({ type: "CREATE_TEST", payload: prompt.payload! });
      return prompt.payload!;
    },
    deleteTest: async (test: Test) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.deleteTest(
        state.current.subject.subject,
        test,
      );
      if (!prompt.success) return console.warn(prompt.message);
      dispatch({ type: "DELETE_TEST", payload: test });
    },
    submitTest: async (test: Test) => {
      if (!state.current.subject) throw new Error("Subject not set");
      const prompt = await window.ipcRenderer.submitTest(
        state.current.subject.subject,
        test,
      );
      if (!prompt.success) throw new Error(prompt.message);
      dispatch({ type: "SUBMIT_TEST", payload: test });
    },
  };

  return (
    <DataContext.Provider value={{ state, actions }}>
      {children}
    </DataContext.Provider>
  );
};
