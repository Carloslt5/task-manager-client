import { Link, useLocation } from "react-router-dom";

import { getAllowedMenuItems } from "@/app/module-orquestator/modules.helpers";
import { useLoggedUser } from "@/domains/auth/hooks/useLoggedUser";

export const AdminMenuItems = ({
  toggleMenuOpen,
}: {
  toggleMenuOpen: boolean;
}) => {
  const { user } = useLoggedUser();
  const location = useLocation();

  if (!user) return null;

  return getAllowedMenuItems(user)().map((menuItem) => {
    const isActive = location.pathname.startsWith(menuItem.path!);

    return (
      <li
        className={`bg__color rounded cursor-pointer list-none flex items-center p-1 text-blue-chill-50 ${
          isActive ? "bg-blue-chill-500 dark:bg-zinc-700" : ""
        }`}
        key={menuItem.path}
        title={menuItem.title}
      >
        <Link to={`${menuItem.path}`} className="flex items-center gap-3">
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
