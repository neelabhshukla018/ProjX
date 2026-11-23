import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  Menu,
  X,
  FolderPlus,
  CheckCircle2,
  UserPlus,
  Command,
} from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';
import Button from '../common/Button';

export const TopNav = () => {
  const {
    isMobileNavOpen,
    setIsMobileNavOpen,
    setIsGlobalSearchOpen,
    setIsNewProjectModalOpen,
    setIsNewTaskModalOpen,
    setIsInviteModalOpen,
  } = useWorkspace();
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/app' || path === '/app/') return 'Overview';
    if (path.includes('/app/tasks')) return 'My Tasks';
    if (path.includes('/app/projects')) return 'Projects';
    if (path.includes('/app/teams')) return 'Teams';
    if (path.includes('/app/calendar')) return 'Calendar';
    if (path.includes('/app/analytics')) return 'Analytics';
    if (path.includes('/app/activity')) return 'Activity';
    if (path.includes('/app/profile')) return 'Profile';
    if (path.includes('/app/settings')) return 'Settings';
    return 'Workspace';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left side: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-slate-400 font-medium hidden sm:inline">Workspace</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-slate-900 font-semibold">{getBreadcrumb()}</span>
        </nav>
      </div>

      {/* Center: Global Search Trigger */}
      <div className="flex-1 max-w-md mx-2 sm:mx-4">
        <button
          type="button"
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full h-9 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-between text-xs transition-colors shadow-subtle group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="hidden sm:inline">Search projects, tasks, or teammates...</span>
            <span className="sm:hidden">Search...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded shadow-xs">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right side: Quick Action "+ New", Notifications, User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Create Dropdown */}
        <div className="relative">
          <Button
            size="sm"
            variant="primary"
            leftIcon={Plus}
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="hidden sm:inline-flex"
          >
            New
          </Button>

          {showQuickMenu && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-dropdown border border-slate-200/90 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setShowQuickMenu(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsNewTaskModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                New Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsNewProjectModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-left"
              >
                <FolderPlus className="w-4 h-4 text-violetAccent-600" />
                New Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsInviteModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-left"
              >
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Invite Member
              </button>
            </div>
          )}
        </div>

        <NotificationDropdown />
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
        <UserDropdown />
      </div>
    </header>
  );
};

export default TopNav;
