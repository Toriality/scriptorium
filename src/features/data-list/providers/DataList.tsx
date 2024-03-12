import { Fragment, createContext, useState, useMemo } from "react";
import { DataListContextType } from "../types";
import { DataListItem } from "./DataListItem";
import EmptyMessage from "../components/EmptyMessage";
import useLoadMore from "../hooks/useLoadMore";
import LoadMoreButton from "../components/LoadMoreButton";

export const DataListContext = createContext<DataListContextType | null>(null);

interface DataListProps<T> {
  skeleton: React.ReactNode;
  className?: string;
  of: string;
  items: Array<T> | null;
  itemComponent: (item: T, toggleEditMode: () => void) => React.ReactNode;
  useDefaultClassName?: boolean;
}

const DataList = <T,>({
  items,
  of,
  itemComponent,
  className,
  useDefaultClassName = true,
  skeleton,
}: DataListProps<T>) => {
  const [itemBeingHovered, setItemBeingHovered] = useState<number | null>(null);
  const [itemBeingEdited, setItemBeingEdited] = useState<number | null>(null);
  const { loadAmount, loadMore } = useLoadMore();

  const defaultClassName = "flex w-full flex-col gap-2 overflow-hidden";

  const c = useMemo(() => {
    return `${className} ${useDefaultClassName && defaultClassName}`;
  }, [className, useDefaultClassName]);

  function toggleEditMode(i: number) {
    if (itemBeingEdited === i) return setItemBeingEdited(null);
    else return setItemBeingEdited(i);
  }

  onkeyup = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setItemBeingEdited(null);
    }
  };

  if (items === null) return <>{skeleton}</>;

  return (
    <DataListContext.Provider
      value={{
        items,
        itemBeingHovered,
        setItemBeingHovered,
        itemBeingEdited,
        setItemBeingEdited,
      }}
    >
      <div className={c}>
        {items.length ? (
          items
            .slice(0, loadAmount)
            .map((item, i) => (
              <Fragment key={i}>
                {itemComponent(item, () => toggleEditMode(i))}
              </Fragment>
            ))
        ) : (
          <EmptyMessage type={of} />
        )}
        {loadAmount < items.length && <LoadMoreButton onClick={loadMore} />}
      </div>
    </DataListContext.Provider>
  );
};

DataList.Item = DataListItem;

export { DataList };
