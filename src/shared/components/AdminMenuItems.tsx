import { Link } from "react-router-dom";

import { getAllowedMenuItems } from "@/app/module-orquestator/modules.helpers";
import { useLoggedUser } from "@/domains/auth/hooks/useLoggedUser";

export const AdminMenuItems = ({ toggleMenuOpen }: { toggleMenuOpen: boolean }) => {
  const { user } = useLoggedUser();

  return getAllowedMenuItems(user)().map((menuItem) => {
    return (
      <li
        className={
          "rounded cursor-pointe hover:bg-blue-chill-600 dark:hover:bg-blue-chill-950 list-none flex items-center	p-1 text-blue-chill-50 "
        }
        key={menuItem.path}
        title={menuItem.title}
      >
        <Link to={`${menuItem.path}`} className="flex items-center gap-3">
          <span>{menuItem.icon}</span>
          <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && "scale-0"}`}>
            {menuItem.title}
          </p>
        </Link>
      </li>
    );
  });
};
