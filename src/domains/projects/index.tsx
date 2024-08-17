import { Navigate, RouteObject } from "react-router-dom";

import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

import { ProjectPage } from "./pages/ProjectPage";
import { MODULE_PROJECT } from "./projects.constants";
import { projectsHandlers } from "./projects.mocks.handlers";

import "./features/states";
import "./features/tickets";
import "./features/todos";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard/:id",
        element: <ProjectPage />,
      },
    ],
  },
];

registerModule({
  name: MODULE_PROJECT,
  mockHandlers: projectsHandlers,
  routes,
});
