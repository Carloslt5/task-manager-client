import { ProjectPage } from '@/pages/Project';
import { Route, Routes } from 'react-router-dom';

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ProjectPage />} />
    </Routes>
  );
};
