import { Navigate, Route, Routes } from 'react-router-dom';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<h1 className="text-red-400">PAGINA USUARIO DASHBOARD</h1>}
      />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
