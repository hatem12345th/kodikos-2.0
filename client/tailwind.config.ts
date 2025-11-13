import {  heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "dark", // allows toggling dark mode via 'class'
  plugins: [heroui()],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",       // light mode primary
        "primary-dark": "#000", // optional dark mode primary
      },
    },
  },
};
