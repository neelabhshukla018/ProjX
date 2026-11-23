import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import GlobalSearchModal from './GlobalSearchModal';

// Interactive Modals
import ProjectModal from '../projects/ProjectModal';
import TaskModal from '../tasks/TaskModal';
import InviteMemberModal from '../teams/InviteMemberModal';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col antialiased text-[#0F0F0F] overflow-x-hidden w-full">
      {/* Top Navigation Bar (Unified Navbar replacing Sidebar) */}
      <TopNav />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 p-3.5 sm:p-5 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200 min-w-0">
        <Outlet />
      </main>

      {/* Global Interactive Modals */}
      <GlobalSearchModal />
      <ProjectModal />
      <TaskModal />
      <InviteMemberModal />
    </div>
  );
};

export default DashboardLayout;
