export interface QuestionDatabaseType {
  id: number;
  category_id: number;
  text: string;
  options: string;
  answer: number;
  tags: string;
}

export interface QuestionFormType {
  id?: number;
  category_id: number;
  text: string;
  options: string[];
  answer: number;
  tags: number[];
}
