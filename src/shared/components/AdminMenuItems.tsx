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
          className={`bg__color rounded cursor-pointer flex items-center gap-3 p-1 text-blue-chill-50 ${
            isActive ? "bg-blue-chill-500 dark:bg-zinc-700" : ""
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
