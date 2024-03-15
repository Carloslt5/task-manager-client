import React from 'react';
import Navigation from './NavBar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <Navigation />
      <main className="p-4">{children};</main>
    </div>
  );
}
