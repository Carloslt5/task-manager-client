import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants/Menu.const';
import { useNavBar } from '../hooks/useNavBar';
import { Logo } from './Logo';
import { ArrowLeft } from './icons/ArrowLeft';
import { ArrowRight } from './icons/ArrowRight';
import { Dark } from './icons/Dark';
import { Dashboard } from './icons/Dashboard';
import { Home } from './icons/Home';
import { Light } from './icons/Light';
import { Login } from './icons/Login';

const MENU_CONST_USER = [
  {
    title: 'Home',
    src: '/',
    icon: <Home />,
  },
  {
    title: 'Dashboard',
    src: `/dashboard`,
    icon: <Dashboard />,
  },
  {
    title: 'Login',
    src: `/login`,
    icon: <Login />,
  },
];

const Navigation = () => {
  const { darkMode, setThemeMode, toggleMenu, toggleMenuOpen, toggleThemeHandler } = useNavBar();

  useEffect(() => {
    setThemeMode(darkMode);
  }, [darkMode, setThemeMode]);

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
      <aside className="mt-10">
        {MENU_CONST_USER.map((menuItem, idx) => (
          <li
            className={
              'rounded cursor-pointer list-none text-blue-chill-50	p-1 hover:bg-blue-chill-600 hover:dark:bg-blue-chill-950 transition ease-in-out'
            }
            key={idx}
            title={menuItem.title}
          >
            <Link to={menuItem.src} className="flex items-center gap-4 ">
              <span className="p-1">{menuItem.icon}</span>
              <p
                className={`text-md origin-left whitespace-nowrap duration-300 text-white ${!toggleMenuOpen && 'scale-0'}`}
              >
                {menuItem.title}
              </p>
            </Link>
          </li>
        ))}
      </aside>

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
