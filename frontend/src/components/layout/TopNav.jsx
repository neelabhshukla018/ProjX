import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  Menu,
  X,
  FolderPlus,
  CheckCircle2,
  UserPlus,
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  Calendar,
  BarChart3,
  Activity,
  Settings,
  ChevronDown,
  Layers,
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
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
  } = useWorkspace();

  const location = useLocation();

  // Dropdown states
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Click outside refs
  const moreMenuRef = useRef(null);
  const workspaceMenuRef = useRef(null);
  const quickMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMoreMenu(false);
      }
      if (workspaceMenuRef.current && !workspaceMenuRef.current.contains(e.target)) {
        setShowWorkspaceMenu(false);
      }
      if (quickMenuRef.current && !quickMenuRef.current.contains(e.target)) {
        setShowQuickMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top-level navigation links
  const primaryLinks = [
    { label: 'Overview', to: '/app', icon: LayoutDashboard, exact: true },
    { label: 'Projects', to: '/app/projects', icon: FolderKanban },
    { label: 'My Tasks', to: '/app/tasks', icon: CheckSquare },
  ];

  // Secondary items in the "More" dropdown list
  const moreDropdownLinks = [
    {
      group: 'COLLABORATION',
      items: [
        { label: 'Teams', to: '/app/teams', icon: Users, desc: 'Team directory & departments' },
        { label: 'Calendar', to: '/app/calendar', icon: Calendar, desc: 'Deadlines & sprint milestones' },
      ],
    },
    {
      group: 'INSIGHTS & TELEMETRY',
      items: [
        { label: 'Analytics', to: '/app/analytics', icon: BarChart3, desc: 'Sprint velocity & cycle throughput' },
        { label: 'Activity', to: '/app/activity', icon: Activity, desc: 'Workspace audit log feed' },
      ],
    },
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Settings', to: '/app/settings', icon: Settings, desc: 'Configuration & API endpoints' },
      ],
    },
  ];

  // Check if current route is inside the "More" dropdown
  const allMoreItems = moreDropdownLinks.flatMap((g) => g.items);
  const activeMoreItem = allMoreItems.find(
    (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
  );
  const isMoreActive = Boolean(activeMoreItem);

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E5E5E5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle, Logo & Workspace Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/app" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base sm:text-lg text-[#0F0F0F] tracking-tight">
                Proj<span className="font-bold" style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span>
              </span>
            </Link>

            <div className="h-5 w-px bg-[#E5E5E5] hidden md:block" />

            {/* Workspace Selector Dropdown List */}
            <div className="relative hidden sm:block" ref={workspaceMenuRef}>
              <button
                type="button"
                onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] border border-transparent hover:border-[#E5E5E5] transition-colors"
                title="Switch Workspace"
              >
                <span className="w-5 h-5 rounded bg-[#0F0F0F] text-white flex items-center justify-center text-[10px] font-bold">
                  {activeWorkspace?.name?.[0] || 'W'}
                </span>
                <span className="truncate max-w-[120px]">{activeWorkspace?.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A5A5A]" />
              </button>

              {showWorkspaceMenu && (
                <div className="absolute top-full left-0 mt-1.5 w-60 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-dropdown py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-[#5A5A5A] uppercase tracking-wider">
                    Workspaces
                  </div>
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => {
                        setActiveWorkspace(ws);
                        setShowWorkspaceMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                        ws.id === activeWorkspace.id
                          ? 'bg-[#F5F5F5] text-[#0F0F0F] font-semibold'
                          : 'text-[#5A5A5A] hover:bg-[#F9F9F9] hover:text-[#0F0F0F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-4 h-4 rounded bg-[#2C2C2C] text-white flex items-center justify-center text-[9px] font-bold">
                          {ws.name[0]}
                        </span>
                        <span className="truncate">{ws.name}</span>
                      </div>
                      <span className="text-[10px] text-[#5A5A5A] shrink-0">{ws.role}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Clean, Restrained Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs">
            {/* Primary Core Links */}
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold shadow-xs'
                      : 'text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]'
                  }`
                }
              >
                <link.icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </NavLink>
            ))}

            {/* "More" Dropdown List */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  isMoreActive
                    ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold shadow-xs'
                    : 'text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]'
                }`}
              >
                <span>{activeMoreItem ? activeMoreItem.label : 'More'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    showMoreMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showMoreMenu && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-dropdown py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {moreDropdownLinks.map((section, idx) => (
                    <div key={section.group} className={idx > 0 ? 'mt-2 pt-2 border-t border-[#EFEFEF]' : ''}>
                      <div className="px-3.5 py-1 text-[10px] font-bold text-[#8E8E8E] tracking-wider uppercase">
                        {section.group}
                      </div>
                      <div className="space-y-0.5 mt-0.5">
                        {section.items.map((item) => {
                          const ItemIcon = item.icon;
                          const isItemActive =
                            location.pathname === item.to ||
                            location.pathname.startsWith(`${item.to}/`);

                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setShowMoreMenu(false)}
                              className={`w-full px-3.5 py-2 text-left flex items-start gap-2.5 transition-colors rounded-lg mx-auto ${
                                isItemActive
                                  ? 'bg-[#F5F5F5] text-[#0F0F0F] font-semibold'
                                  : 'text-[#2C2C2C] hover:bg-[#F9F9F9] hover:text-[#0F0F0F]'
                              }`}
                            >
                              <ItemIcon className="w-4 h-4 mt-0.5 text-[#5A5A5A] shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-semibold leading-tight">{item.label}</p>
                                <p className="text-[10px] text-[#5A5A5A] leading-tight truncate mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right: Search, + New, Notifications, User */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Minimal Search Button */}
            <button
              type="button"
              onClick={() => setIsGlobalSearchOpen(true)}
              className="h-8.5 px-2.5 rounded-lg bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-[#D8D8D8] text-[#5A5A5A] hover:text-[#0F0F0F] flex items-center gap-2 text-xs transition-colors shadow-subtle group"
              title="Search workspace (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#5A5A5A] group-hover:text-[#0F0F0F]" />
              <span className="hidden xl:inline text-xs">Search...</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-[#FFFFFF] border border-[#D8D8D8] rounded font-mono text-[#5A5A5A]">
                ⌘K
              </kbd>
            </button>

            {/* Quick Action "+ New" Dropdown List */}
            <div className="relative" ref={quickMenuRef}>
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
                <div className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] rounded-xl shadow-dropdown border border-[#E5E5E5] z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
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

            {/* Notifications & User Profile */}
            <NotificationDropdown />
            <div className="w-px h-5 bg-[#E5E5E5] hidden sm:block" />
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (On screens < lg) */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-[#0F0F0F]/60 backdrop-blur-xs transition-opacity duration-200"
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-[#FFFFFF] z-10 shadow-2xl flex flex-col justify-between border-r border-[#E5E5E5]">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <Link to="/app" onClick={handleMobileNavClick} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-[#0F0F0F]">Proj𝕏</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Workspace Selector */}
            <div className="p-3 border-b border-[#E5E5E5] bg-[#F9F9F9]">
              <div className="text-[10px] font-semibold text-[#5A5A5A] uppercase tracking-wider mb-1.5 px-1">
                Workspace
              </div>
              <div className="space-y-1">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => {
                      setActiveWorkspace(ws);
                      setShowWorkspaceMenu(false);
                    }}
                    className={`w-full px-2.5 py-1.5 text-left text-xs rounded-lg flex items-center justify-between transition-colors ${
                      ws.id === activeWorkspace.id
                        ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold'
                        : 'text-[#2C2C2C] hover:bg-[#EAEAEA]'
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    <span className="text-[10px] opacity-80">{ws.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div>
                <div className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-wider mb-1 px-2">
                  Core
                </div>
                {primaryLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.exact}
                    onClick={handleMobileNavClick}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold'
                          : 'text-[#2C2C2C] hover:bg-[#F5F5F5] hover:text-[#0F0F0F]'
                      }`
                    }
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {moreDropdownLinks.map((section) => (
                <div key={section.group}>
                  <div className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-wider mb-1 px-2">
                    {section.group}
                  </div>
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold'
                            : 'text-[#2C2C2C] hover:bg-[#F5F5F5] hover:text-[#0F0F0F]'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile Quick Action Footer */}
            <div className="p-4 border-t border-[#E5E5E5] space-y-2 bg-[#F9F9F9]">
              <Button
                variant="primary"
                size="sm"
                leftIcon={Plus}
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsNewTaskModalOpen(true);
                }}
                className="w-full justify-center"
              >
                Create Task
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={FolderPlus}
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsNewProjectModalOpen(true);
                }}
                className="w-full justify-center"
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
