import { motion } from "framer-motion";

export const AnimatedPage = ({ children }: React.PropsWithChildren) => {
  return (
    <motion.div
      className="size-full overflow-scroll"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
};
