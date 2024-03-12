import { forwardRef, InputHTMLAttributes } from "react";
import { InputError } from "./InputError";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hideLabel?: boolean;
  error?: string;
  inputClassName?: string;
  containerClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { hideLabel = false, error, inputClassName, containerClassName, ...props },
    ref,
  ) => {
    const errorClass = "ring-error";

    return (
      <div className={containerClassName}>
        <input
          type="text"
          className={twMerge(
            "rounded bg-item-default px-2  py-1 shadow ring-1 ring-primary hover:bg-item-hover focus:bg-item-hover",
            inputClassName,
            error && errorClass,
          )}
          ref={ref}
          {...props}
        />
        {!hideLabel && error && <InputError>{error}</InputError>}
      </div>
    );
  },
);
