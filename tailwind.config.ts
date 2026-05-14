import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./@modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "prose",
    "max-w-none",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "text-green-500",
    "text-orange-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        ternary: "rgb(var(--color-ternary) / <alpha-value>)",
      },
    },
  },
  plugins: [typography],
};

export default config;
