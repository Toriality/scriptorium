import {
  Category,
  CategoryForm,
  CategoryData,
  CurrentCategoryData,
} from "@/features/categories";
import { Subject, SubjectData, CurrentSubjectData } from "@/features/subjects";
import { Tag } from "@/features/tags";
import { QuestionDatabaseType, QuestionFormType } from "@/features/questions";
import { Test, CustomTestFormType, RandomTestFormType } from "@/features/tests";

export type DataAction =
  | { type: "LEAVE_ALL_CURRENT_DATA" }
  | { type: "LEAVE_CURRENT_CATEGORY_DATA" }
  | { type: "SET_CURRENT_SUBJECT"; payload: CurrentSubjectData }
  | { type: "SET_SUBJECTS"; payload: SubjectData[] }
  | { type: "CREATE_SUBJECT"; payload: Subject }
  | {
      type: "EDIT_SUBJECT";
      payload: { oldSubject: SubjectData; newSubject: SubjectData };
    }
  | { type: "DELETE_SUBJECT"; payload: SubjectData }
  | { type: "SET_CURRENT_CATEGORY"; payload: CurrentCategoryData }
  | { type: "CREATE_CATEGORY"; payload: Category }
  | {
      type: "EDIT_CATEGORY";
      payload: { oldCategory: Category; newCategory: Category };
    }
  | { type: "DELETE_CATEGORY"; payload: CategoryData }
  | { type: "ADD_TAG"; payload: { tag: Tag } }
  | { type: "DELETE_TAG"; payload: { tag: Tag } }
  | { type: "CREATE_QUESTION"; payload: QuestionDatabaseType }
  | { type: "EDIT_QUESTION"; payload: QuestionDatabaseType }
  | {
      type: "DELETE_QUESTION";
      payload: { question: QuestionDatabaseType; associatedTests: number[] };
    }
  | { type: "CREATE_TEST"; payload: Test }
  | { type: "DELETE_TEST"; payload: Test }
  | { type: "SUBMIT_TEST"; payload: Test };

export interface DataActions {
  leaveAllCurrentData: () => void;
  leaveCurrentCategoryData: () => void;

  setCurrentSubject: (subject: Subject) => Promise<void>;
  setSubjects: () => Promise<void>;
  createSubject: (subject: Subject) => Promise<PromptMessage>;
  editSubject: (
    oldSubject: SubjectData,
    newSubject: SubjectData,
  ) => Promise<void>;
  deleteSubject: (subject: SubjectData) => Promise<void>;

  setCurrentCategory: (category_id: number) => Promise<void>;
  createCategory: (category: CategoryForm) => Promise<Category>;
  editCategory: (oldCategory: Category, newCategory: Category) => Promise<void>;
  deleteCategory: (category: CategoryData) => Promise<void>;

  getTags: (tags: number[]) => Tag[];
  addTag: (tagname: string) => Promise<void>;
  deleteTag: (tag: Tag) => Promise<void>;

  getQuestions: (questions: number[]) => QuestionDatabaseType[];
  createQuestion: (question: QuestionFormType) => Promise<QuestionDatabaseType>;
  editQuestion: (question: QuestionFormType) => Promise<void>;
  deleteQuestion: (question: QuestionDatabaseType) => Promise<void>;

  createCustomTest: (test: CustomTestFormType) => Promise<Test>;
  createRandomTest: (test: RandomTestFormType) => Promise<Test>;
  deleteTest: (test: Test) => Promise<void>;
  submitTest: (test: Test) => Promise<void>;
}

export interface DataState {
  current: {
    subject: CurrentSubjectData;
    category: CurrentCategoryData;
  };
  subjects: SubjectData[] | null;
}
