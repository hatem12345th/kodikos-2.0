import { heroui } from "@heroui/react";
import herouiTheme from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [herouiTheme],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // ✅ Use class strategy

  plugins: [heroui()],

 
};
