import { useTranslation } from "react-i18next";

interface Props {
  onClick: () => void;
}

export default function LoadMoreButton({ onClick }: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <button
        className="animated text-xs font-semibold text-green-600 hover:font-bold"
        onClick={onClick}
      >
        {t("buttons.loadMore")}
      </button>
    </div>
  );
}
