import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fadeWhenVisible } from "@/lib/Motion";

interface Props {
  to?: string;
  disableNewButton?: boolean;
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({
  to,
  children,
  disableNewButton = false,
}: Props) => {
  return (
    <motion.div
      {...fadeWhenVisible}
      className="flex w-full items-center justify-between"
    >
      <h2 className="text-lg font-semibold">{children}</h2>
      {!disableNewButton && (
        <Link to={to || "new"} className="group outline-none">
          <FontAwesomeIcon
            icon={faPlus}
            className="animated text-link-default hover:text-link-hover group-focus:text-link-hover"
          />
        </Link>
      )}
    </motion.div>
  );
};
