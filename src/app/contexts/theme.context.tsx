import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

export interface ThemeContextType {
  darkMode: boolean;
  toggleThemeHandler: VoidFunction;
}

const initialThemeMode = localStorage.getItem("theme") === "dark";

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProviderWrapper({ children }: { readonly children: ReactNode }) {
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

  const value = { darkMode, toggleThemeHandler };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useThemeContext must be used within a ThemeProviderWrapper");
  }

  return themeContext;
};
