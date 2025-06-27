import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";

interface Props {
  readonly children?: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-screen h-screen p-4 overflow-hidden bg-blue-chill-100 dark:bg-dark-100 text-blue-chill-50">
        <Outlet />
        {children}
      </main>
    </div>
  );
};
