export interface Test {
  id: number;
  category_id: number;
  name: string;
  questions: string;
  answers: string | null;
  completed: number;
}

export interface CustomTestFormType {
  category_id?: number;
  name: string;
  questions: number[];
}

export interface RandomTestFormType {
  category_id?: number;
  name: string;
  numberOfQuestions: number;
  tags: number[];
}
