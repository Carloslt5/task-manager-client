import { RouteObject } from "react-router-dom";

import { registerModule } from "@/app/module-orquestator/modules.helpers";
import { PublicLayout } from "@/shared/layouts/PublicLayout";

import { MODULE_AUTH } from "./auth.constants";
import { handlers } from "./auth.mocks.handlers";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <SignInPage /> },
    ],
  },
];

registerModule({
  name: MODULE_AUTH,
  mockHandlers: handlers,
  routes,
});
