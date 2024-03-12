export type DataListContextType = {
  items: Array<unknown>;
  itemBeingHovered: number | null;
  setItemBeingHovered: React.Dispatch<React.SetStateAction<number | null>>;
  itemBeingEdited: number | null;
  setItemBeingEdited: React.Dispatch<React.SetStateAction<number | null>>;
};

export type DataListItemContextType = {
  item: unknown;
  index: number | null;
};
