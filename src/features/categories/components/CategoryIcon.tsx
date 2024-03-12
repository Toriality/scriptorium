import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

interface CategoryIconProps {
  className?: string;
  icon?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  icon,
  className,
}) => {
  const { t } = useTranslation();

  const [error, setError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset error state when icon value changes
  useEffect(() => {
    setError(false);
  }, [icon]);

  // Display a generic category icon when there is an error loading the image url
  // or when the icon string is null/undefined
  if (!icon || error)
    return (
      <div
        className={twMerge(
          "flex h-16 w-16 items-center justify-center rounded bg-accent",
          className,
        )}
      >
        <FontAwesomeIcon icon="book" className="h-8 w-8" />
      </div>
    );

  return (
    <>
      {!imageLoaded && (
        <Skeleton
          containerClassName="h-16 w-16"
          className="h-full w-full rounded"
        />
      )}
      <img
        hidden={!imageLoaded}
        src={icon}
        className={twMerge("h-16 w-16 rounded", className)}
        alt={t("categories.alt")}
        onError={() => setError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  );
};
