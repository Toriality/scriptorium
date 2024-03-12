import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Tag } from "..";

interface Props {
  tag: Tag;
  handleDelete?: (tag: Tag) => void;
  handleToggleTag?: (tag: Tag) => void;
  isToggledByDefault?: boolean;
  className?: string;
}

export function TagComponent({
  tag,
  handleToggleTag,
  handleDelete,
  isToggledByDefault = false,
  className,
}: Props) {
  const [isToggled, setIsToggled] = useState(isToggledByDefault);

  function toggle() {
    if (!handleToggleTag) return;
    handleToggleTag(tag);
    setIsToggled(!isToggled);
  }

  return (
    <div
      onClick={toggle}
      className={twMerge(
        "animated group relative flex select-none items-end rounded-full bg-tag-default px-2 py-1 text-sm text-tag ring-2 ring-tag-default hover:bg-tag-hover hover:ring-tag-hover",
        isToggled &&
          "bg-selected-default font-bold ring-selected hover:bg-selected-hover hover:ring-selected",
        className,
      )}
    >
      <div>{tag.name}</div>
      {handleDelete && (
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => handleDelete(tag)}
          className="absolute right-1 hidden translate-y-0.5 cursor-pointer rounded-full bg-tag-default p-1 hover:text-red-500 group-hover:block"
        />
      )}
    </div>
  );
}
