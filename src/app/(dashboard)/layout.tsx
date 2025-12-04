'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Menu from '@/icons/Menu';

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="lg:ml-64 transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
