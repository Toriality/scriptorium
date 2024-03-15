import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubject } from "../api/getSubject";
import { CurrentSubjectData } from "..";

export const useSubject = () => {
  const { subject_name } = useParams();
  const [subject, setSubject] = useState<CurrentSubjectData | null>(null);

  useEffect(() => {
    if (!subject_name) return;
    getSubject(subject_name!).then(setSubject);
  }, [subject_name]);

  return { subject };
};
