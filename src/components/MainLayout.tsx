import React from 'react';
import Navigation from './NavBar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-4 bg-blue-chill-200 dark:bg-dark-200">{children};</main>
    </div>
  );
}
