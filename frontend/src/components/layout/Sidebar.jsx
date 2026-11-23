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
  } = useWorkspace();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const location = useLocation();

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
          badgeColor: 'bg-brand-500/20 text-brand-300 border border-brand-500/30',
        },
        {
          label: 'Projects',
          to: '/app/projects',
          icon: FolderKanban,
          badge: stats.totalProjects,
          badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
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
        relative bg-[#0b0f19] border-r border-[#1a2336] text-slate-300 flex flex-col justify-between
        transition-all duration-300 ease-in-out z-30 select-none
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header & Workspace Switcher */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#1a2336]">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight leading-tight flex items-center gap-1.5">
                  ProjX
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                    Pro
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Enterprise Hub</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Layers className="w-5 h-5" />
            </div>
          )}

          {/* Sidebar collapse button */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace selector dropdown */}
        {!sidebarCollapsed && (
          <div className="p-3 border-b border-[#1a2336] relative">
            <button
              type="button"
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="w-full px-3 py-2 rounded-lg bg-[#111726] hover:bg-[#161f33] border border-[#1e293f] flex items-center justify-between text-left transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-6 h-6 rounded bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold text-[11px]">
                  {activeWorkspace.name[0]}
                </div>
                <div className="truncate">
                  <div className="font-semibold text-slate-200 truncate">{activeWorkspace.name}</div>
                  <div className="text-[10px] text-slate-400">{activeWorkspace.role}</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-[#111726] border border-[#1e293f] rounded-xl shadow-dropdown py-1.5 z-40">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
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
                        ? 'bg-brand-600/20 text-brand-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{ws.name}</span>
                    <span className="text-[10px] text-slate-400">{ws.membersCount} members</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation items */}
        <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navSections.map((section) => (
            <div key={section.title}>
              {!sidebarCollapsed ? (
                <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 tracking-wider">
                  {section.title}
                </div>
              ) : (
                <div className="h-4 border-b border-[#1a2336] mb-3 mx-2" />
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
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative group
                        ${
                          isActive
                            ? 'bg-brand-600/20 text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-[#121929]'
                        }
                        ${sidebarCollapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-500 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate flex-1 tracking-tight">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge !== null && item.badge !== undefined && (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            item.badgeColor || 'bg-slate-800 text-slate-300'
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

      {/* Footer Info Card & User Snippet */}
      <div className="p-3 border-t border-[#1a2336] bg-[#090d16]">
        {!sidebarCollapsed ? (
          <div className="p-3 rounded-xl bg-gradient-to-b from-[#131b2e] to-[#0e1424] border border-[#1e2a44] text-xs">
            <div className="flex items-center justify-between text-slate-200 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Enterprise Tier
              </span>
              <span className="text-[10px] text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">SOC-2 compliant workspace</p>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-500 to-violetAccent-500 h-full w-3/4 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="Enterprise Tier">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
