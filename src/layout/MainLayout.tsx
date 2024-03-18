import { Outlet } from 'react-router-dom';
import Navigation from '../components/NavBar';

export function MainLayout() {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-4 bg-blue-chill-200 dark:bg-dark-200 text-blue-chill-50 ">
        <Outlet />
      </main>
    </div>
  );
}
