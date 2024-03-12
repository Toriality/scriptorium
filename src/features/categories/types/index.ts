import { QuestionDatabaseType } from "@/features/questions";
import { Test } from "@/features/tests";

export type CategoryData = {
  category: Category;
  numberOfQuestions: number;
  numberOfTests: number;
};

export type CurrentCategoryData = {
  category: Category;
  questions: QuestionDatabaseType[];
  tests: Test[];
} | null;

export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface CategoryForm {
  subject?: string;
  name: string;
  icon: string;
}
