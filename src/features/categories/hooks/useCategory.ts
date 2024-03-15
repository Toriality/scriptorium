import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "..";
import { getCategory } from "../api/getCategory";

export const useCategory = () => {
  const { category_id, subject_name } = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!category_id || !subject_name) return;
    getCategory(subject_name, parseInt(category_id)).then(setCategory);
  }, [category_id, subject_name]);

  return { category };
};
