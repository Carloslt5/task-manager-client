import { ReactNode } from 'react';
import Navigation from '../components/NavBar';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-4 bg-blue-chill-200 dark:bg-dark-200 text-blue-chill-50 ">
        {children}
      </main>
    </div>
  );
}
