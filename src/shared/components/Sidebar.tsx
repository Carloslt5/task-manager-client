import { useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { APP_GLOBAL_NAME } from "@/app/app.constants";

import { AdminMenuItems } from "./AdminMenuItems";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Logo } from "../icons/Logo";

export const Sidebar = () => {
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);

  const toggleMenu = () => {
    setToggleMenuOpen(!toggleMenuOpen);
  };

  return (
    <nav
      className={`bg-blue-chill-400 dark:bg-zinc-950 min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? "w-60" : "w-16"}`}
    >
      <div
        className="absolute flex items-center justify-center p-1 text-white border border-white rounded-full cursor-pointer bg__color top-3 -right-3"
        onClick={toggleMenu}
      >
        {toggleMenuOpen ? (
          <ArrowBackIosNewIcon style={{ fontSize: "12px" }} />
        ) : (
          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
        )}
      </div>

      <Link to={"/"}>
        <div className="flex items-center rounded bg__color bg__color-hover gap-x-2" title={APP_GLOBAL_NAME}>
          <span>
            <Logo />
          </span>
          <h1
            className={`text-1xl font-bold origin-left whitespace-nowrap duration-300 text-white ${!toggleMenuOpen && "scale-0"}`}
          >
            {APP_GLOBAL_NAME}
          </h1>
        </div>
      </Link>
      <aside className="mt-10">
        <AdminMenuItems toggleMenuOpen={toggleMenuOpen} />
      </aside>

      <ThemeToggleButton toggleMenuOpen={toggleMenuOpen} />
    </nav>
  );
};
