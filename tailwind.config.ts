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
        foreground: "#122A31",
        primary: {
          DEFAULT: "#26b3cc",
          light: "#4ACCC7",
          dark: "#047772",
        },
        accent: "#FDCC34",
        muted: "#94A3B8",
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
