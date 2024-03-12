import { PropsWithChildren, useMemo } from "react";
import { useDataListItemContext } from "../hooks/useDataListItemContext";
import { useDataListContext } from "../hooks/useDataListContext";

interface DataListItemHoverProps extends PropsWithChildren {
  className?: string;
  useDefaultClassName?: boolean;
}

export const DataListItemHover: React.FC<DataListItemHoverProps> = ({
  children,
  className,
  useDefaultClassName = true,
}) => {
  const { itemBeingHovered, itemBeingEdited } = useDataListContext();
  const { index } = useDataListItemContext();

  const defaultClassName = "z-10 flex gap-2 text-sm";

  const c = useMemo(() => {
    return `${className} ${useDefaultClassName && defaultClassName}`;
  }, [className, useDefaultClassName]);

  if (itemBeingEdited !== index && itemBeingHovered === index)
    return <div className={c}>{children}</div>;
  else return null;
};
