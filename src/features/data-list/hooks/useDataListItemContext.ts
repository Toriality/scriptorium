import { useContext } from "react";
import { DataListItemContext } from "../providers/DataListItem";

export const useDataListItemContext = () => {
  const context = useContext(DataListItemContext);
  if (context === null) {
    throw new Error(
      "useDataListItemContext must be used within a DataListItemProvider",
    );
  }
  return context;
};
