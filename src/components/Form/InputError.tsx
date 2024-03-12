import { PropsWithChildren } from "react";

export const InputError: React.FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-error text-xs">{children}</p>;
};
