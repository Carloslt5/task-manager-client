import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants/Menu.const';
import { Logo } from './Logo';
import { ArrowLeft } from './icons/ArrowLeft';
import { ArrowRight } from './icons/ArrowRight';
import { Dark } from './icons/Dark';
import { Light } from './icons/Light';

const initialThemeMode = localStorage.getItem('theme') === 'dark';

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(initialThemeMode);
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);

  useEffect(() => {
    setThemeMode(darkMode);
  }, [darkMode]);

  const setThemeMode = (darkMode: unknown) => {
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

  return (
    <nav
      className={`bg-blue-chill-400 dark:bg-blue-chill-800 min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}
    >
      <div
        className="absolute w-6 border border-white rounded-full cursor-pointer text-blue-chill-50 bg-blue-chill-600 dark:bg-blue-chill-950 toggleMenu top-3 -right-3 "
        onClick={toggleMenu}
      >
        {toggleMenuOpen ? <ArrowLeft /> : <ArrowRight />}
      </div>

      <Link to={'/'}>
        <div
          className="flex items-center rounded bg-blue-chill-600 dark:bg-blue-chill-950 navBarTop gap-x-2"
          title={APP_NAME}
        >
          <span>
            <Logo />
          </span>
          <h1
            className={`text-1xl font-bold origin-left whitespace-nowrap duration-300 text-white ${!toggleMenuOpen && 'scale-0'}`}
          >
            {APP_NAME}
          </h1>
        </div>
      </Link>

      <span
        className={`w-8 p-2 flex ${toggleMenuOpen ? 'justify-start' : 'justify-center'}  mt-auto text-white rounded cursor-pointer`}
        title="Theme Mode"
        onClick={toggleThemeHandler}
      >
        {darkMode ? <Light /> : <Dark />}
      </span>
    </nav>
  );
};

export default Navigation;
