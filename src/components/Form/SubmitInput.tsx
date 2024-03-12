import { twMerge } from "tailwind-merge";
import { InputError } from "./InputError";
import { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface SubmitInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isSubmitting: boolean;
  onSubmit: () => void;
  error?: string;
  className?: string;
}

export const SubmitInput: React.FC<SubmitInputProps> = ({
  isSubmitting,
  onSubmit,
  error,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <input
        type="submit"
        className={twMerge(
          "animated rounded bg-button-default px-2 py-1.5 text-sm font-semibold text-white hover:bg-button-hover disabled:bg-button-disabled",
          className,
        )}
        disabled={isSubmitting}
        value={isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
        onClick={onSubmit}
        {...props}
      />
      {error && <InputError>{error}</InputError>}
    </div>
  );
};
