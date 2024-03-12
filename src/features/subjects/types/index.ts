import { CategoryData } from "@/features/categories";
import { Tag } from "@/features/tags";

export type Subject = string;
export type SubjectFormData = string;
export type SubjectData = {
  subject: Subject;
  numberOfTags: number;
  numberOfCategories: number;
};
export type CurrentSubjectData = {
  subject: Subject;
  tags: Tag[];
  categories: CategoryData[];
} | null;
