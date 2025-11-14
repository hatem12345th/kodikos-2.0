"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <Button
      onPress={() => setTheme(isDark ? "light" : "dark")}
      variant="flat"
      size="sm"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black shadow-sm transition-all duration-300"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
