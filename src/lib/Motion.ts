export const fadeWhenVisible = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 1 },
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
};
