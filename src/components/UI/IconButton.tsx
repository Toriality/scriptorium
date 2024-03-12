import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  type?: "add" | "edit" | "delete" | "other";
  icon: IconProp;
  onClick: () => void;
  className?: string;
  error?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  type,
  icon,
  onClick,
  className,
  error = false,
}) => {
  const typeClass = () => {
    switch (type) {
      case "add":
        return "hover:text-link-hover";
      case "edit":
        return "hover:text-amber-500";
      case "delete":
        return "hover:text-red-500";
      case "other":
        return "hover:text-blue-500";
      default:
        return "text-gray-400 hover:text-gray-600";
    }
  };

  const errorClass = useMemo(() => {
    return error ? "text-red-400 hover:text-red-400 cursor-not-allowed " : "";
  }, [error]);

  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      className={twMerge(
        "animated cursor-pointer rounded-full p-1 text-link-default hover:text-link-hover",
        className,
        typeClass(),
        errorClass,
      )}
    />
  );
};
