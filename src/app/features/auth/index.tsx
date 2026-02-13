import { Navigate, RouteObject } from "react-router-dom";

import { registerModule } from "@/app/module-orquestator/modules.helpers";

import { MODULE_AUTH } from "./auth.constants";
import { handlers } from "./auth.mocks.handlers";
import { SignInPage } from "./pages/SignInPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
];

registerModule({
  name: MODULE_AUTH,
  mockHandlers: handlers,
  routes,
});
