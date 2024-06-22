import { useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Logo } from "../icons/Logo";

const initialThemeMode = localStorage.getItem("theme") === "dark";

export const APP_NAME = "TASK-MANAGER";

export const Sidebar = () => {
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(initialThemeMode);

  const toggleMenu = () => {
    setToggleMenuOpen(!toggleMenuOpen);
  };

  const toggleThemeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`bg-blue-chill-400 dark:bg-blue-chill-800 min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? "w-60" : "w-16"}`}
    >
      <div
        className="absolute flex items-center justify-center p-1 border border-white rounded-full cursor-pointer text-blue-chill-50 bg-blue-chill-600 dark:bg-blue-chill-950 top-3 -right-3"
        onClick={toggleMenu}
      >
        {toggleMenuOpen ? (
          <ArrowBackIosNewIcon style={{ fontSize: "12px" }} />
        ) : (
          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
        )}
      </div>

      <Link to={"/"}>
        <div className="flex items-center rounded bg-blue-chill-600 dark:bg-blue-chill-950 gap-x-2" title={APP_NAME}>
          <span>
            <Logo />
          </span>
          <h1
            className={`text-1xl font-bold origin-left whitespace-nowrap duration-300 text-white ${!toggleMenuOpen && "scale-0"}`}
          >
            {APP_NAME}
          </h1>
        </div>
      </Link>
      <aside className="mt-10">
        <h2>modulos</h2>
      </aside>

      <span
        className={`w-8 p-2 flex ${toggleMenuOpen ? "justify-start" : "justify-center"}  mt-auto text-white rounded cursor-pointer`}
        title="Theme Mode"
        onClick={toggleThemeHandler}
      >
        {darkMode ? <Brightness7Icon /> : <DarkModeIcon />}
      </span>
    </nav>
  );
};
