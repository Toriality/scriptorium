import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface LinkProps extends PropsWithChildren {
  to: string;
}

export const DataListItemLink: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="focus:ring-accent absolute left-0 h-full w-full rounded ring-1 ring-transparent"
    >
      {children}
    </Link>
  );
};
