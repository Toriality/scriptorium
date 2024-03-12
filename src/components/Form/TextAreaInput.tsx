import { twMerge } from "tailwind-merge";
import { InputError } from "./InputError";
import { forwardRef } from "react";

interface TextAreaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hideLabel?: boolean;
  error?: string;
  inputClassName?: string;
  containerClassName?: string;
}

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    { hideLabel = false, error, inputClassName, containerClassName, ...props },
    ref,
  ) => {
    const errorClass = "ring-error";

    return (
      <div className={containerClassName}>
        <textarea
          className={twMerge(
            "rounded bg-item-default px-2 py-1 shadow ring-2 ring-primary focus:bg-item-hover",
            inputClassName,
            error && errorClass,
          )}
          ref={ref}
          {...props}
        >
          {props.children}
        </textarea>
        {!hideLabel && error && <InputError>{error}</InputError>}
      </div>
    );
  },
);
