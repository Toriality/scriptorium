import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const ScriptoriumButton: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    return navigate("/", { replace: true });
  };

  const textShadowClasses = `
[text-shadow:_0_0_5px_var(--color-bg-button)] hover:shadow-lg hover:[text-shadow:_0_0_10px_var(--color-bg-selected)]
  `;
  const translationClasses = `
absolute left-1/2 z-10  w-full -translate-x-1/2
  `;

  return (
    <h1
      onClick={goHome}
      className={twMerge(
        "animated header-btn cursor-pointer select-none rounded rounded-t-none bg-accent text-sm font-black text-white shadow-md",
        "flex h-full items-center justify-center py-4",
        textShadowClasses,
        translationClasses,
      )}
    >
      Scriptorium
    </h1>
  );
};
