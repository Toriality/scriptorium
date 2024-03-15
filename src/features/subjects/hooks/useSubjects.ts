import { useEffect, useState } from "react";
import { getSubjects } from "../api/getSubjects";
import { SubjectData } from "..";
import { useToast } from "@/hooks/useToast";
import { deleteSubject as deleteSubjectAPI } from "../api/deleteSubject";
import { editSubject as editSubjectAPI } from "../api/editSubject";
import { createSubject as createSubjectAPI } from "../api/createSubject";

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectData[] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  const deleteSubject = async (subject: SubjectData) => {
    const result = await deleteSubjectAPI(subject);

    if (result.success) {
      setSubjects((prev) => prev!.filter((s) => s.subject !== subject.subject));
      toast({
        shouldRedirect: false,
        toast: { message: result.message, type: "success" },
      });
    }
  };

  const editSubject = async (oldSubject: string, newSubject: string) => {
    const result = await editSubjectAPI(oldSubject, newSubject);

    if (result.success) {
      setSubjects((prev) => {
        return prev!.map((subject) => {
          if (subject.subject === oldSubject) {
            return { ...subject, subject: newSubject };
          } else return subject;
        });
      });
      toast({
        shouldRedirect: false,
        toast: { message: result.message, type: "success" },
      });
    }
  };

  const createSubject = async (subject: string) => {
    const result = await createSubjectAPI(subject);
    if (result.success) {
      setSubjects((prev) => [
        ...(prev || []),
        { subject, numberOfCategories: 0, numberOfTags: 0 },
      ]);
      toast({
        to: "/" + subject,
        shouldRedirect: true,
        toast: { message: result.message, type: "success" },
      });
    }
  };

  return { subjects, deleteSubject, editSubject, createSubject };
};
