import {
  Category,
  CategoryData,
  CategoryForm,
  CurrentCategoryData,
} from "@/features/categories";
import { QuestionDatabaseType, QuestionFormType } from "@/features/questions";
import {
  SubjectData,
  Subject,
  CurrentSubjectData,
  SubjectFormData,
} from "@/features/subjects";
import { Tag } from "@/features/tags";
import { CustomTestFormType, RandomTestFormType, Test } from "@/features/tests";

export type GetSubjects = () => Promise<SubjectData[]>;
export type GetSubject = (subject: Subject) => Promise<CurrentSubjectData>;
export type CreateSubject = (
  subjectFormData: SubjectFormData,
) => Promise<PromptMessage>;
export type EditSubject = (
  previewSubject: Subject,
  newSubject: Subject,
) => Promise<PromptMessage>;
export type DeleteSubject = (
  subjectData: SubjectData,
) => Promise<PromptMessage>;
export type GetCategory = (
  subject: Subject,
  category_id: number,
) => Promise<CurrentCategoryData>;
export type CreateCategory = (
  subject: Subject,
  category: CategoryForm,
) => Promise<PromptMessage<Category>>;
export type EditCategory = (
  subject: Subject,
  oldCategory: Category,
  newCategory: Category,
) => Promise<PromptMessage>;
export type DeleteCategory = (
  subject: Subject,
  categoryData: CategoryData,
) => Promise<PromptMessage>;
export type AddTAg = (subject: Subject, tagname: string) => Promise<Tag>;
export type DeleteTag = (subject: Subject, tag: Tag) => Promise<PromptMessage>;
export type CreateQuestion = (
  subject: Subject,
  question: QuestionFormType,
) => Promise<PromptMessage<QuestionDatabaseType>>;
export type EditQuestion = (
  subject: Subject,
  question: QuestionFormType,
) => Promise<PromptMessage<QuestionDatabaseType>>;
export type DeleteQuestion = (
  subject: Subject,
  question: QuestionDatabaseType,
) => Promise<PromptMessage<number[]>>;
export type CreateCustomTest = (
  subject: Subject,
  test: CustomTestFormType,
) => Promise<PromptMessage<Test>>;
export type CreateRandomTest = (
  subject: Subject,
  test: RandomTestFormType,
) => Promise<PromptMessage<Test>>;
export type DeleteTest = (
  subject: Subject,
  test: Test,
) => Promise<PromptMessage>;
export type SubmitTest = (
  subject: Subject,
  test: Test,
) => Promise<PromptMessage>;

export type IpcMethods = {
  getSubjects: GetSubjects;
  getSubject: GetSubject;
  createSubject: CreateSubject;
  editSubject: EditSubject;
  deleteSubject: DeleteSubject;
  getCategory: GetCategory;
  createCategory: CreateCategory;
  editCategory: EditCategory;
  deleteCategory: DeleteCategory;
  addTag: AddTAg;
  deleteTag: DeleteTag;
  createQuestion: CreateQuestion;
  editQuestion: EditQuestion;
  deleteQuestion: DeleteQuestion;
  createCustomTest: CreateCustomTest;
  createRandomTest: CreateRandomTest;
  deleteTest: DeleteTest;
  submitTest: SubmitTest;
};

type IpcBasicMethods = {
  sendQuit: () => void;
  sendMinimize: () => void;
  sendMaximize: () => void;
  openSubjectsFolder: () => void;
};

export type IpcRenderer = import("electron").IpcRenderer &
  IpcMethods &
  IpcBasicMethods;
