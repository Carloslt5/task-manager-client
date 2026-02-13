import { Link, useLocation } from "react-router-dom";

import { useLoggedUser } from "@/app/features/auth/hooks/useLoggedUser";
import { getAllowedMenuItems } from "@/app/module-orquestator/modules.helpers";

type AdminMenuItemsProps = {
  toggleMenuOpen: boolean;
};

export const AdminMenuItems = ({ toggleMenuOpen }: AdminMenuItemsProps) => {
  const { user } = useLoggedUser();
  const location = useLocation();

  if (!user) return null;

  return getAllowedMenuItems(user)().map((menuItem) => {
    const isActive = location.pathname.startsWith(menuItem.path!);

    return (
      <li className="list-none" key={menuItem.path} title={menuItem.title}>
        <Link
          to={`${menuItem.path}`}
          className={`rounded cursor-pointer flex items-center gap-3 p-1 text-primary-50 hover:bg-primary-500 dark:hover:bg-neutral-800 ${
            isActive ? "bg-primary-600 dark:bg-neutral-800" : ""
          }`}
        >
          <span>{menuItem.icon}</span>
          <p
            className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && "scale-0"}`}
          >
            {menuItem.title}
          </p>
        </Link>
      </li>
    );
  });
};
