import { useCallback, useEffect, useState } from "react";

const initialThemeMode = localStorage.getItem("theme") === "dark";

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(initialThemeMode);

  const setThemeMode = useCallback((darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleThemeHandler = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setThemeMode(darkMode);
  }, [darkMode, setThemeMode]);

  return {
    darkMode,
    toggleThemeHandler,
  };
};
