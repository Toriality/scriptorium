import { DataContext } from "./DataProvider";
import { useContext } from "react";

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
