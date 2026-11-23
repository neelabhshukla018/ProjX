import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import GlobalSearchModal from './GlobalSearchModal';
import { useWorkspace } from '../../hooks/useWorkspace';

// Interactive Modals
import ProjectModal from '../projects/ProjectModal';
import TaskModal from '../tasks/TaskModal';
import InviteMemberModal from '../teams/InviteMemberModal';

export const DashboardLayout = () => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useWorkspace();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col lg:flex-row antialiased text-[#0F0F0F] overflow-x-hidden w-full">
      {/* Desktop Sidebar (Fixed sticky on desktop) */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-[#0F0F0F]/70 backdrop-blur-xs transition-opacity duration-200"
          />
          {/* Slide-over Content */}
          <div className="relative w-72 max-w-[85vw] h-full bg-[#0F0F0F] z-10 shadow-2xl flex flex-col">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full min-h-screen">
        <TopNav />
        <main className="flex-1 p-3.5 sm:p-5 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Global Interactive Modals */}
      <GlobalSearchModal />
      <ProjectModal />
      <TaskModal />
      <InviteMemberModal />
    </div>
  );
};

export default DashboardLayout;
