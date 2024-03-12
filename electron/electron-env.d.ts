/// <reference types="vite-plugin-electron/electron-env" />

// import { CustomTestFormType, RandomTestFormType } from "@/features/tests";

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    DIST: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// // Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("./types").IpcRenderer;
}

// interface IpcMethods {
//   /* SUBJECTS */
//   getSubjects(): Promise<SubjectData[]>;
//   getSubject(subject: Subject): Promise<CurrentSubjectData>;
//   createSubject(subject: Subject): Promise<PromptMessage>;
//   editSubject(oldSubject: Subject, newSubject: Subject): Promise<PromptMessage>;
//   deleteSubject(subjectData: SubjectData): Promise<PromptMessage>;

//   /* CATEGORIES */
//   getCategory(
//     subject: Subject,
//     category_id: number,
//   ): Promise<CurrentCategoryData>;
//   createCategory(
//     subject: Subject,
//     category: CategoryForm,
//   ): Promise<PromptMessage<Category>>;
//   editCategory(
//     subject: Subject,
//     oldCategory: Category,
//     newCategory: Category,
//   ): Promise<PromptMessage>;
//   deleteCategory(
//     subject: Subject,
//     categoryData: CategoryData,
//   ): Promise<PromptMessage>;

//   /* TAGS */
//   addTag(subject: Subject, tagname: string): Promise<Tag>;
//   deleteTag(subject: Subject, tag: Tag): Promise<PromptMessage>;

//   /* QUESTIONS */
//   createQuestion(
//     subject: Subject,
//     question: QuestionForm,
//   ): Promise<PromptMessage<Question>>;
//   editQuestion(
//     subject: Subject,
//     question: Question,
//   ): Promise<PromptMessage<Question>>;
//   deleteQuestion(
//     subject: Subject,
//     question: Question,
//   ): Promise<PromptMessage<number | undefined>>;

//   /* TESTS */
//   createCustomTest(
//     subject: Subject,
//     test: CustomTestFormType,
//   ): Promise<PromptMessage<Test>>;
//   createRandomTest(
//     subject: Subject,
//     test: RandomTestFormType,
//   ): Promise<PromptMessage<Test>>;
//   deleteTest(subject: Subject, test: Test): Promise<PromptMessage>;
//   submitTest(subject: Subject, test: Test): Promise<PromptMessage>;
// }

type PromptMessage<T = undefined> = {
  success: boolean;
  message: string;
  payload?: T;
};
