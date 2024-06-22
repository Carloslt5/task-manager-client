import { Navigate, RouteObject } from "react-router-dom";

import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

import { ProjectPage } from "./pages/ProjectPage";
import { MODULE_PROJECT } from "./projects.constants";
import { handlers } from "./projects.mocks.handlers";
import { DashboardPage } from "../dashboard/pages/DashboardPage";

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
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "dashboard/:projectId",
        element: <ProjectPage />,
      },
    ],
  },
];

registerModule({
  name: MODULE_PROJECT,
  mockHandlers: handlers,
  routes,
});
