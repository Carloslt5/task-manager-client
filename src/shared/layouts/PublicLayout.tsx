import { Link, Outlet } from "react-router-dom";

import { ThemeToggleButton } from "@/shared/components/ThemeToggleButton";
import { Logo } from "@/shared/icons/Logo";

export const PublicLayout = () => {
  return (
    <div className="bg-primary-200 dark:bg-dark-100 h-svh text-primary-900 dark:text-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 bg-primary-600 dark:bg-neutral-900">
        <Link to="/" className="flex items-center gap-2 text-white font-bold">
          <Logo />
          Kanban Manager
        </Link>
        <ThemeToggleButton />
      </nav>
      <Outlet />
    </div>
  );
};
