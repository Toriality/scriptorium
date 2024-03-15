import { Tag } from "../types";

export const deleteTag = async (subject: string, tag: Tag) => {
  return await window.ipcRenderer.deleteTag(subject, tag);
};
