import { Navigate, RouteObject } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";

import { MenuItem } from "@/app/app.types";
import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

import { MODULE_DASHBOARD } from "./dashboard.constants";
import { DashboardPage } from "./pages/DashboardPage";
import { User, UserRoles } from "../auth/auth.types";

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
    ],
  },
];

const menuItems: MenuItem[] = [
  {
    title: "dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    isAllowed: (user: User) => Object.values(UserRoles).some((role) => user.roles.includes(role)),
  },
];

registerModule({
  name: MODULE_DASHBOARD,
  routes,
  menuItems,
});
