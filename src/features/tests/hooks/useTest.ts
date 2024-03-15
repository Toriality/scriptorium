import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTest } from "../api/getTest";
import { Test } from "..";
import { submitTest as submitTestAPI } from "../api/submitTest";

export const useTest = () => {
  const { subject_name, test_id } = useParams();
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    getTest(subject_name!, parseInt(test_id!)).then(setTest);
  }, [subject_name, test_id]);

  const submitTest = async (submitted_test: Test) => {
    if (!test) return;
    const result = await submitTestAPI(subject_name!, submitted_test);
    if (result.success) {
      setTest({ ...test, ...submitted_test });
    }
  };

  return { test, submitTest };
};
