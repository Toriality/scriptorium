import { PropsWithChildren, useMemo } from "react";
import { useDataListItemContext } from "../hooks/useDataListItemContext";
import { useDataListContext } from "../hooks/useDataListContext";

interface DataListItemShyProps extends PropsWithChildren {
  className?: string;
  useDefaultClassName?: boolean;
}

export const DataListItemShy: React.FC<DataListItemShyProps> = ({
  children,
  className,
  useDefaultClassName = true,
}) => {
  const { itemBeingHovered, itemBeingEdited } = useDataListContext();
  const { index } = useDataListItemContext();

  const defaultClassName = "flex items-center gap-4 text-xs";

  const c = useMemo(() => {
    return `${className} ${useDefaultClassName && defaultClassName}`;
  }, [className, useDefaultClassName]);

  if (itemBeingEdited !== index && itemBeingHovered !== index)
    return <div className={c}>{children}</div>;
  else return null;
};
