import { useContext } from "react";
import { DataListContext } from "../providers/DataList";

export function useDataListContext() {
  const context = useContext(DataListContext);
  if (context === null) {
    throw new Error(
      "useDataListContext must be used within a DataListProvider",
    );
  }
  return context;
}
