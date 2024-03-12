import { useState } from "react";

export default function useEditingData<T>() {
  const [editingData, setEditingData] = useState<T | null>(null);

  onkeydown = (e) => {
    if (e.key === "Escape") setEditingData(null);
  };

  return { editingData, setEditingData };
}
