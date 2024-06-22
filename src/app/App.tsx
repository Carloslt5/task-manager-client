import "./libs/darkMode";
import "./app.styles.css";
import "./module-orquestator/modules";

import { AppProviders } from "./AppProviders";
import { AppRoutes } from "./AppRoutes";

export function App() {
  return (
    <>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </>
  );
}
