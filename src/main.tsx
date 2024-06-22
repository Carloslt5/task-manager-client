import React from "react";

import ReactDOM from "react-dom/client";

import "./app/app.styles.css";
import "./app/libs/darkMode";

import { App } from "./app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
