import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTests } from "../api/getTests";
import { Test } from "..";
import { deleteTest as deleteTestAPI } from "../api/deleteTest";
import { useToast } from "@/hooks/useToast";
import { CustomTestFormType, RandomTestFormType } from "../types";
import { createCustomTest as createCustomTestAPI } from "../api/createCustomTest";
import { createRandomTest as createRandomTestAPI } from "../api/createRandomTest";

export const useTests = () => {
  const { subject_name, category_id } = useParams();
  const [tests, setTests] = useState<Test[] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getTests(subject_name!, parseInt(category_id as string)).then(setTests);
  }, [subject_name, category_id]);

  const deleteTest = async (test: Test) => {
    const result = await deleteTestAPI(subject_name!, test);
    if (result.success) {
      setTests((prev) => prev!.filter((t) => t.id !== test.id));
      toast({
        shouldRedirect: false,
        toast: { message: result.message, type: "success" },
      });
    }
  };

  const createCustomTest = async (test: CustomTestFormType) => {
    const result = await createCustomTestAPI(subject_name!, test);
    if (result.success) {
      setTests((prev) => [...prev!, result.payload!]);
      toast({
        shouldRedirect: true,
        to: "../..",
        toast: { message: result.message, type: "success" },
      });
    }
  };

  const createRandomTest = async (test: RandomTestFormType) => {
    const result = await createRandomTestAPI(subject_name!, test);
    if (result.success) {
      setTests((prev) => [...prev!, result.payload!]);
      toast({
        shouldRedirect: true,
        to: "../..",
        toast: { message: result.message, type: "success" },
      });
    }
  };

  return { tests, deleteTest, createCustomTest, createRandomTest };
};
