import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 bg-white dark:bg-black transition-colors">
      <Button
        variant="shadow"
        color="success"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </Button>

      <Button variant="shadow" color="success">
        Hello HeroUI
      </Button>

      <p className="bg-primary text-white dark:bg-primary-dark p-2 rounded">
        Text Test
      </p>
    </div>
  );
}
