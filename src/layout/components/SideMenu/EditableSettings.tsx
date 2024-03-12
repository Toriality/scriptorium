import { twMerge } from "tailwind-merge";

interface EditableSettingsProps<T> {
  items: T[];
  itemChildren: (item: T) => JSX.Element;
  itemSelectionKey: keyof T;
  selectedString: string;
  className?: string;
  toggleEditMode: () => void;
  onClick: (item: T) => void;
}
export const EditableSettings = <T,>({
  items,
  itemSelectionKey,
  selectedString,
  className,
  toggleEditMode,
  itemChildren,
  onClick,
}: EditableSettingsProps<T>) => (
  <div
    className={twMerge("flex items-center justify-center text-lg", className)}
  >
    <div
      onClick={toggleEditMode}
      className="absolute left-0 size-full cursor-auto"
    />
    {items.map((item, i) => (
      <div
        key={i}
        className={twMerge(
          "z-10 rounded bg-item-default px-1.5 hover:bg-item-hover",
          item[itemSelectionKey] === selectedString &&
            "bg-selected-default hover:bg-selected-hover",
        )}
        onClick={() => onClick(item)}
      >
        {itemChildren(item)}
      </div>
    ))}
  </div>
);
