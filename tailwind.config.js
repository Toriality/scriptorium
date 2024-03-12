/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        error: "var(--color-text-error)",
        link: {
          default: "var(--color-text-link)",
          hover: "var(--color-text-link-hover)",
        },
        tag: "var(--color-text-tag)",
      },
      ringColor: {
        primary: "var(--color-ring-primary)",
        accent: "var(--color-ring-accent)",
        error: "var(--color-ring-error)",
        tag: {
          default: "var(--color-ring-tag)",
          hover: "var(--color-ring-tag-hover)",
        },
        selected: "var(--color-ring-selected)",
        correct: "var(--color-ring-correct)",
        incorrect: "var(--color-ring-incorrect)",
      },
      backgroundColor: {
        main: "var(--color-bg-main)",
        card: "var(--color-bg-card)",
        accent: "var(--color-bg-accent)",
        button: {
          default: "var(--color-bg-button)",
          hover: "var(--color-bg-button-hover)",
          disabled: "var(--color-bg-button-disabled)",
        },
        item: {
          default: "var(--color-bg-item)",
          hover: "var(--color-bg-item-hover)",
        },
        tag: {
          default: "var(--color-bg-tag)",
          hover: "var(--color-bg-tag-hover)",
        },
        selected: {
          default: "var(--color-bg-selected)",
          hover: "var(--color-bg-selected-hover)",
        },
        correct: "var(--color-bg-correct)",
        incorrect: "var(--color-bg-incorrect)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
