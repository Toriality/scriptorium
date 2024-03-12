import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface DataListItemStatsProps {
  className?: string;
  useDefaultClassName?: boolean;
  icon: IconProp;
  display: number;
}

export const DataListItemStats: React.FC<DataListItemStatsProps> = ({
  className,
  useDefaultClassName = true,
  icon,
  display,
}) => {
  const defaultClassName = "flex items-center gap-2";

  const c = useMemo(() => {
    return `${className} ${useDefaultClassName && defaultClassName}`;
  }, [className, useDefaultClassName]);

  return (
    <div className={c}>
      <FontAwesomeIcon icon={icon} className="text-primary" />
      <p>{display}</p>
    </div>
  );
};
