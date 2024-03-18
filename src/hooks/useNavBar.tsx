import { useState } from 'react';

const initialThemeMode = localStorage.getItem('theme') === 'dark';

export const useNavBar = () => {
  const [darkMode, setDarkMode] = useState(initialThemeMode);
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);

  const setThemeMode = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenu = () => {
    setToggleMenuOpen(!toggleMenuOpen);
  };
  const toggleThemeHandler = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleMenuOpen, setThemeMode, toggleMenu, toggleThemeHandler };
};
