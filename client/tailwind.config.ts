import { heroui } from "@heroui/react";
import herouiTheme from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [herouiTheme],  // ✅ REQUIRED

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  plugins: [heroui()],

  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
      },
    },
  },
};
