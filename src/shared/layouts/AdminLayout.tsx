import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";

export const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-blue-chill-200 dark:bg-dark-200 text-blue-chill-50 ">
        <Outlet />
      </main>
    </div>
  );
};
