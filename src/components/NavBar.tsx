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
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setToggleMenuOpen(!toggleMenuOpen);
  };
  const toggleThemeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`bg-slate-700 dark:bg-zinc-950 dark:text-gray-300 text-white min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}
    >
      <div
        className="absolute w-8 rounded-full cursor-pointer toggleMenu top-4 -right-4 "
        onClick={toggleMenu}
      >
        {toggleMenuOpen ? <ArrowLeft /> : <ArrowRight />}
      </div>

      <Link to={'/'}>
        <div
          className="flex items-center rounded bg-slate-600 dark:bg-zinc-800 navBarTop gap-x-2"
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
