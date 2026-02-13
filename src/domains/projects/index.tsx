import FolderIcon from "@mui/icons-material/Folder";
import { RouteObject } from "react-router-dom";

import { MenuItem } from "@/app/app.types";
import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsListPage } from "./pages/ProjectsListPage";
import { MODULE_PROJECT } from "./projects.constants";
import { projectsHandlers } from "./projects.mocks.handlers";
import "./features/states";
import "./features/tickets";
import "./features/todos";

import { User, UserRoles } from "@/app/features/auth/auth.types";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "projects",
        element: <ProjectsListPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectPage />,
      },
    ],
  },
];

const menuItems: MenuItem[] = [
  {
    title: "Projects",
    icon: <FolderIcon />,
    path: "/admin/projects",
    priority: 1,
    isAllowed: (user: User) =>
      Object.values(UserRoles).some((role) => user.roles.includes(role)),
  },
];

registerModule({
  name: MODULE_PROJECT,
  mockHandlers: projectsHandlers,
  routes,
  menuItems,
});
