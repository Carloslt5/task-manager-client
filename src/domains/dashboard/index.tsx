import DashboardIcon from "@mui/icons-material/Dashboard";
import { Navigate, RouteObject } from "react-router-dom";

import { MenuItem } from "@/app/app.types";
import { User, UserRoles } from "@/app/features/auth/auth.types";
import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

import { MODULE_DASHBOARD } from "./dashboard.constants";
import { DashboardPage } from "./pages/DashboardPage";

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
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    priority: 0,
    isAllowed: (user: User) =>
      Object.values(UserRoles).some((role) => user.roles.includes(role)),
  },
];

registerModule({
  name: MODULE_DASHBOARD,
  routes,
  menuItems,
});
