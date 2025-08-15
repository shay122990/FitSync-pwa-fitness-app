import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        deep: "rgb(var(--deep) / <alpha-value>)",
        // utility for surfaces/cards
        surface: "rgb(var(--surface) / <alpha-value>)",
        // borders
        line: "rgb(var(--line) / <alpha-value>)",
      },
    },
  },
  plugins: [lineClamp],
};
