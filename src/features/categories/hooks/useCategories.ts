import { useEffect, useState } from "react";
import { Category, CategoryData, CategoryForm } from "..";
import { useParams } from "react-router-dom";
import { getCategories } from "../api/getCategories";
import { editCategory as editCategoryAPI } from "../api/editCategory";
import { deleteCategory as deleteCategoryAPI } from "../api/deleteCategory";
import { createCategory as createCategoryAPI } from "../api/createCategory";
import { useToast } from "@/hooks/useToast";

export const useCategories = () => {
  const { subject_name } = useParams();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!subject_name) return;
    getCategories(subject_name).then(setCategories);
  }, [subject_name]);

  const editCategory = async (oldCategory: Category, newCategory: Category) => {
    const result = await editCategoryAPI(
      subject_name!,
      oldCategory,
      newCategory,
    );
    if (result.success) {
      setCategories((prev) => {
        return prev!.map((category) => {
          if (category.category === oldCategory) {
            return { ...category, category: newCategory };
          } else return category;
        });
      });
    }
  };

  const deleteCategory = async (category: CategoryData) => {
    const result = await deleteCategoryAPI(subject_name!, category);
    if (result.success) {
      setCategories((prev) =>
        prev!.filter((c) => c.category !== category.category),
      );
    }
  };

  const createCategory = async (category: CategoryForm) => {
    const result = await createCategoryAPI(subject_name!, category);
    if (result.success) {
      setCategories((prev) => [
        ...prev!,
        { category: result.payload!, numberOfQuestions: 0, numberOfTests: 0 },
      ]);
      toast({
        shouldRedirect: true,
        to: "../" + result.payload!.id,
        toast: {
          message: result.message,
          type: "success",
        },
      });
    }
  };

  return { categories, editCategory, deleteCategory, createCategory };
};
