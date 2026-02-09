import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1D22",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#26b3cc",
          light: "#6de5f7",
          dark: "#1d8a9e",
        },
        accent: "#FDCC34",
        muted: "#94A3B8",
        surface: "#14282E",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
