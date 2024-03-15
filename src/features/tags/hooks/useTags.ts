import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "..";
import { deleteTag as deleteTagAPI } from "../api/deleteTag";
import { addTag as addTagAPI } from "../api/addTag";
import { getTags } from "../api/getTags";

export const useTags = (ids?: number[]) => {
  const { subject_name } = useParams();
  const [tags, setTags] = useState<Tag[] | null>(null);

  useEffect(() => {
    if (!subject_name) return;
    getTags(subject_name, ids).then(setTags);
  }, [subject_name, ids]);

  const deleteTag = async (tag: Tag) => {
    const result = await deleteTagAPI(subject_name!, tag);
    if (result.success) {
      setTags((prev) => prev!.filter((t) => t.id !== tag.id));
    }
  };

  const addTag = async (tag: string) => {
    const newTag = await addTagAPI(subject_name!, tag);
    setTags((prev) => [...prev!, newTag]);
  };

  return { tags, deleteTag, addTag };
};
