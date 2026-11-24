import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import TopNav from './TopNav';
import GlobalSearchModal from './GlobalSearchModal';

// Interactive Modals
import ProjectModal from '../projects/ProjectModal';
import TaskModal from '../tasks/TaskModal';
import InviteMemberModal from '../teams/InviteMemberModal';

export const DashboardLayout = () => {
  const { user, authLoading, isAuthenticated } = useWorkspace();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0F0F0F] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#5A5A5A] font-medium">Verifying ProjX workspace session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col antialiased text-[#0F0F0F] overflow-x-hidden w-full">
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 p-3.5 sm:p-5 lg:p-8 pt-2 sm:pt-4 max-w-7xl w-full mx-auto animate-in fade-in duration-200 min-w-0">
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
