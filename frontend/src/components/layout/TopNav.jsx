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
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E5E5E5] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-20 w-full min-w-0">
      {/* Left side: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden p-2 rounded-lg text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <span className="text-[#B0B0B0] font-medium hidden md:inline">Workspace</span>
          <span className="text-[#D4D4D4] hidden md:inline">/</span>
          <span className="text-[#0F0F0F] font-semibold truncate max-w-[120px] sm:max-w-none">
            {getBreadcrumb()}
          </span>
        </nav>
      </div>

      {/* Center: Minimal Global Search Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4">
        <button
          type="button"
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full h-9 px-2.5 sm:px-3 rounded-lg bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-[#D8D8D8] text-[#5A5A5A] hover:text-[#0F0F0F] flex items-center justify-between text-xs transition-colors shadow-subtle group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-[#5A5A5A] group-hover:text-[#0F0F0F] shrink-0" />
            <span className="hidden sm:inline truncate">Search projects, tasks, teammates...</span>
            <span className="sm:hidden text-[11px]">Search...</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] bg-[#FFFFFF] border border-[#D8D8D8] text-[#2C2C2C] px-1.5 py-0.5 rounded shadow-xs shrink-0">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right side: Quick Action "+ New", Notifications, User Dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
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
              className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] rounded-xl shadow-dropdown border border-[#E5E5E5] z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setShowQuickMenu(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsNewProjectModalOpen(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] flex items-center gap-2.5 transition-colors font-medium"
              >
                <FolderPlus className="w-4 h-4 text-[#0F0F0F]" />
                <span>New Project</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsNewTaskModalOpen(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] flex items-center gap-2.5 transition-colors font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" />
                <span>New Task</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsInviteModalOpen(true);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] flex items-center gap-2.5 transition-colors font-medium"
              >
                <UserPlus className="w-4 h-4 text-[#0F0F0F]" />
                <span>Invite Member</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications & Profile */}
        <NotificationDropdown />
        <div className="w-px h-6 bg-[#E5E5E5] hidden sm:block" />
        <UserDropdown />
      </div>
    </header>
  );
};

export default TopNav;
