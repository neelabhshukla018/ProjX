import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  Calendar,
  BarChart3,
  Activity,
  User,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';

export const Sidebar = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    stats,
    setIsMobileNavOpen,
  } = useWorkspace();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    // Close mobile nav when clicking a link
    if (setIsMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
  };

  const navSections = [
    {
      title: 'WORKSPACE',
      items: [
        { label: 'Overview', to: '/app', icon: LayoutDashboard, exact: true },
        {
          label: 'My Tasks',
          to: '/app/tasks',
          icon: CheckSquare,
          badge: stats.assignedTasks > 0 ? stats.assignedTasks : null,
          badgeColor: 'bg-[#2C2C2C] text-[#FFFFFF] border border-[#3A3A3A]',
        },
        {
          label: 'Projects',
          to: '/app/projects',
          icon: FolderKanban,
          badge: stats.totalProjects,
          badgeColor: 'bg-[#2C2C2C] text-[#FFFFFF] border border-[#3A3A3A]',
        },
        { label: 'Teams', to: '/app/teams', icon: Users },
        { label: 'Calendar', to: '/app/calendar', icon: Calendar },
      ],
    },
    {
      title: 'INSIGHTS',
      items: [
        { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
        { label: 'Activity', to: '/app/activity', icon: Activity },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Profile', to: '/app/profile', icon: User },
        { label: 'Settings', to: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`
        relative bg-[#0F0F0F] border-r border-[#222222] text-[#B0B0B0] flex flex-col justify-between
        transition-all duration-300 ease-in-out z-30 select-none h-full
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header & Logo & Workspace Switcher */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#222222]">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2C2C2C] flex items-center justify-center text-white shadow-sm">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#FFFFFF] text-base tracking-tight leading-tight flex items-center gap-1.5">
                  Proj𝕏
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#2C2C2C] text-[#FFFFFF] border border-[#3A3A3A]">
                    Pro
                  </span>
                </span>
                <span className="text-[11px] text-[#B0B0B0] font-medium">Enterprise Hub</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2C2C2C] flex items-center justify-center text-white shadow-sm">
              <Layers className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Sidebar collapse button (desktop only) */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-[#B0B0B0] hover:text-[#FFFFFF] hover:bg-[#2C2C2C] transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace selector dropdown */}
        {!sidebarCollapsed && (
          <div className="p-3 border-b border-[#222222] relative">
            <button
              type="button"
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="w-full px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#222222] border border-[#2A2A2A] flex items-center justify-between text-left transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-6 h-6 rounded bg-[#2C2C2C] border border-[#3F3F3F] flex items-center justify-center text-[#FFFFFF] font-bold text-[11px]">
                  {activeWorkspace.name[0]}
                </div>
                <div className="truncate">
                  <div className="font-semibold text-[#FFFFFF] truncate">{activeWorkspace.name}</div>
                  <div className="text-[10px] text-[#B0B0B0]">{activeWorkspace.role}</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#B0B0B0] shrink-0" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-[#161616] border border-[#2A2A2A] rounded-xl shadow-dropdown py-1.5 z-40">
                <div className="px-3 py-1 text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider">
                  Switch Workspace
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
                        ? 'bg-[#2C2C2C] text-[#FFFFFF] font-semibold'
                        : 'text-[#B0B0B0] hover:bg-[#222222] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>{ws.name}</span>
                    <span className="text-[10px] text-[#B0B0B0]">{ws.membersCount} members</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation items */}
        <div className="px-3 py-4 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)] no-scrollbar">
          {navSections.map((section) => (
            <div key={section.title}>
              {!sidebarCollapsed ? (
                <div className="px-3 mb-2 text-[10px] font-bold text-[#808080] tracking-wider uppercase">
                  {section.title}
                </div>
              ) : (
                <div className="h-4 border-b border-[#222222] mb-3 mx-2" />
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={handleNavClick}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 relative group
                        ${
                          isActive
                            ? 'bg-[#2C2C2C] text-[#FFFFFF] font-semibold'
                            : 'text-[#B0B0B0] hover:text-[#FFFFFF] hover:bg-[#1E1E1E]'
                        }
                        ${sidebarCollapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      {/* Crisp Pure White active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#FFFFFF] rounded-r" />
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#FFFFFF]' : 'text-[#B0B0B0] group-hover:text-[#FFFFFF]'
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate flex-1 tracking-tight">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge !== null && item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.badgeColor || 'bg-[#2C2C2C] text-[#FFFFFF]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info Card & Luxury Badge */}
      <div className="p-3 border-t border-[#222222] bg-[#0A0A0A]">
        {!sidebarCollapsed ? (
          <div className="p-3 rounded-lg bg-[#161616] border border-[#2A2A2A] text-xs">
            <div className="flex items-center justify-between text-[#FFFFFF] font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FFFFFF]" /> Enterprise Plan
              </span>
              <span className="text-[10px] text-[#FFFFFF] bg-[#2C2C2C] px-1.5 py-0.5 rounded border border-[#3A3A3A]">
                Active
              </span>
            </div>
            <p className="text-[11px] text-[#B0B0B0] mb-2 font-normal">SOC-2 compliant workspace</p>
            <div className="w-full bg-[#2C2C2C] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#FFFFFF] h-full w-3/4 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="Enterprise Tier">
            <ShieldCheck className="w-5 h-5 text-[#FFFFFF]" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
