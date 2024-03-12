import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
  type: string;
}

export default function EmptyMessage({ type }: Props) {
  const { t } = useTranslation();

  const to = () => {
    if (type === "subjects" || type === "categories") {
      return `new`;
    } else return `${type}/new`;
  };

  const typePlural = t(type, { count: 0 });
  const typeSingular = t(type, { count: 1 });

  return (
    <div className="m-auto flex flex-col items-center gap-2 rounded bg-item-default px-8 py-10 text-sm italic shadow shadow-black/20">
      <p>{t("empty.message", { type: typePlural.toLowerCase() })}</p>
      <Link to={to()} className="text-link-default hover:text-link-hover">
        {t("empty.button", { type: typeSingular.toLowerCase() })}
      </Link>
    </div>
  );
}
