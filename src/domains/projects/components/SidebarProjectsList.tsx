import FolderIcon from "@mui/icons-material/Folder";
import { Link, useLocation } from "react-router-dom";

import { useFetchProjects } from "../hooks/useFetchProjects";

export const SidebarProjectsList = ({
  toggleMenuOpen,
}: {
  toggleMenuOpen: boolean;
}) => {
  const { data: projects } = useFetchProjects();
  const location = useLocation();

  if (!projects?.data?.length) return null;

  return (
    <div className="mt-4">
      <p
        className={`text-xs uppercase text-blue-chill-200 dark:text-zinc-400 mb-2 origin-left duration-300 ${!toggleMenuOpen && "scale-0"}`}
      >
        Projects
      </p>
      <ul className="flex flex-col gap-1 overflow-y-auto max-h-60">
        {projects.data.map((project) => {
          const path = `/admin/projects/${project.id}`;
          const isActive = location.pathname === path;

          return (
            <li className="list-none" key={project.id} title={project.title}>
              <Link
                to={path}
                className={`bg__color rounded cursor-pointer flex items-center gap-3 p-1 text-blue-chill-50 ${
                  isActive ? "bg-blue-chill-500 dark:bg-zinc-700" : ""
                }`}
              >
                <span>
                  <FolderIcon style={{ fontSize: "20px" }} />
                </span>
                <p
                  className={`origin-left duration-300 whitespace-nowrap text-sm truncate ${!toggleMenuOpen && "scale-0"}`}
                >
                  {project.title}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
