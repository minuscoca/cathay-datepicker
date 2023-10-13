import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "btn-default": "rgb(var(--btn-background-default) / <alpha-value>)",
        "btn-hover": "rgb(var(--btn-background-hover) / <alpha-value>)",
        "btn-today": "rgb(var(--btn-background-today) / <alpha-value>)",
        "btn-active": "rgb(var(--btn-background-active) / <alpha-value>)",
        "btn-disabled": "rgb(var(--btn-background-disabled) / <alpha-value>)",
      },
      colors: {
        "btn-default": "rgb(var(--btn-foreground-default) / <alpha-value>)",
        "btn-hover": "rgb(var(--btn-foreground-hover) / <alpha-value>)",
        "btn-today": "rgb(var(--btn-foreground-today) / <alpha-value>)",
        "btn-active": "rgb(var(--btn-foreground-active) / <alpha-value>)",
        "btn-disabled": "rgb(var(--btn-foreground-disabled) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
