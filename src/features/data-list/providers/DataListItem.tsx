import { motion } from "framer-motion";
import { createContext, PropsWithChildren, useMemo } from "react";
import { useDataListContext } from "../hooks/useDataListContext";
import { DataListItemContextType } from "../types";
import { DataListItemEditableContent } from "../components/DataListItemEditableContent";
import { DataListItemHover } from "../components/DataListItemHover";
import { DataListItemShy } from "../components/DataListItemShy";
import { DataListItemStats } from "../components/DataListItemStats";
import { DataListItemLink } from "../components/DataListItemLink";
import { twMerge } from "tailwind-merge";

export const DataListItemContext =
  createContext<DataListItemContextType | null>(null);

const DataListItem = ({
  item,
  children,
  className,
  useDefaultClassName = true,
}: PropsWithChildren<{
  item: unknown;
  className?: string;
  useDefaultClassName?: boolean;
}>) => {
  const { items, setItemBeingHovered, setItemBeingEdited, itemBeingEdited } =
    useDataListContext();

  const index = useMemo(() => {
    if (!items) return null;
    return items.indexOf(item);
  }, [items, item]);

  const defaultClassName = twMerge(
    "animated relative flex items-center justify-between rounded bg-item-default p-4 shadow",
    itemBeingEdited !== index && "hover:bg-item-hover",
  );

  const c = useMemo(() => {
    return `${className} ${useDefaultClassName && defaultClassName}`;
  }, [className, useDefaultClassName, defaultClassName]);

  function handleMouseEnter() {
    setItemBeingHovered(index);
  }

  function handleMouseLeave() {
    setItemBeingHovered(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "F2") return setItemBeingEdited(index);
  }

  return (
    <DataListItemContext.Provider value={{ item, index }}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, delay: index! * 0.1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={c}
      >
        {children}
      </motion.div>
    </DataListItemContext.Provider>
  );
};

DataListItem.Hover = DataListItemHover;
DataListItem.Shy = DataListItemShy;
DataListItem.EditableContent = DataListItemEditableContent;
DataListItem.Stats = DataListItemStats;
DataListItem.Link = DataListItemLink;

export { DataListItem };
