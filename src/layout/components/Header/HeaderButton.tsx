import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

interface HeaderButtonProps {
  icon: IconProp;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  onClick,
  className,
  disabled,
}) => {
  const disabledClass = "hidden";
  const iconClass =
    "animated header-btn px-3 py-1 text-sm text-link-default hover:text-white hover:bg-button-hover";

  return (
    <div
      className={twMerge(iconClass, disabled && disabledClass, className)}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
