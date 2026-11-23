import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { WorkspaceContext } from './WorkspaceContextInstance';
import {
  currentUser as initialUser,
  initialProjects,
  initialTasks,
  initialTeams,
  initialActivities,
  initialNotifications,
} from '../utils/mockData';

export const WorkspaceProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [teams, setTeams] = useState(initialTeams);
  const [activities, setActivities] = useState(initialActivities);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Workspace UI states
  const workspaces = [
    { id: 'ws-1', name: 'Acme Corp HQ', role: 'Enterprise Admin', membersCount: 38 },
    { id: 'ws-2', name: 'HyperScale Labs', role: 'Lead Architect', membersCount: 14 },
    { id: 'ws-3', name: 'DesignOps Global', role: 'Collaborator', membersCount: 8 },
  ];
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Modals state
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K to open search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Log activity helper
  const addActivity = (action, target, targetType, project) => {
    const newAct = {
      id: `act-${Date.now()}`,
      user: { name: user.name, avatar: user.avatar },
      action,
      target,
      targetType,
      project: project || 'General',
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Project management
  const addProject = (projectData) => {
    const newProject = {
      id: `prj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      members: [
        { id: user.id, name: user.name, avatar: user.avatar, role: 'Lead' },
      ],
      color: '#0F0F0F',
      ...projectData,
    };
    setProjects((prev) => [newProject, ...prev]);
    addActivity('created new project', newProject.name, 'Project', newProject.name);
    toast.success(`Project "${newProject.name}" created successfully!`);
  };

  const updateProject = (projectId, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );
    toast.success('Project updated');
  };

  const deleteProject = (projectId) => {
    const target = projects.find((p) => p.id === projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (target) {
      addActivity('archived project', target.name, 'Project', target.name);
      toast.success(`Project "${target.name}" removed.`);
    }
  };

  // Task management
  const addTask = (taskData) => {
    const newTask = {
      id: `tsk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      subtasks: [],
      tags: taskData.tags || ['General'],
      assignee: taskData.assignee || {
        name: user.name,
        avatar: user.avatar,
      },
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);

    // Update project stats if associated
    if (newTask.projectId) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === newTask.projectId) {
            const newTotal = (p.totalTasks || 0) + 1;
            const newComp = newTask.status === 'done' ? (p.completedTasks || 0) + 1 : (p.completedTasks || 0);
            return {
              ...p,
              totalTasks: newTotal,
              completedTasks: newComp,
              progress: Math.round((newComp / newTotal) * 100),
            };
          }
          return p;
        })
      );
    }

    addActivity('created task', newTask.title, 'Task', newTask.projectName);
    toast.success('Task created successfully!');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const oldStatus = t.status;
          const updated = { ...t, status: newStatus };
          if (oldStatus !== newStatus) {
            const readableStatus = newStatus === 'in_progress' ? 'In Progress' : newStatus === 'done' ? 'Done' : 'To Do';
            addActivity(`moved task to ${readableStatus}`, t.title, 'Task', t.projectName);
            toast.success(`Task status changed to ${readableStatus}`);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = (task.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (target) {
      toast.success('Task removed');
    }
  };

  // Team invite
  const inviteMember = ({ email, role, department, _note }) => {
    const newMember = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: role || 'Contributor',
      department: department || 'Engineering',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      status: 'offline',
      tasksCount: 0,
      projectsCount: 0,
    };

    setTeams((prev) =>
      prev.map((team) => {
        if (team.department === department || team.name.includes(department)) {
          return {
            ...team,
            memberCount: team.memberCount + 1,
            members: [...team.members, newMember],
          };
        }
        return team;
      })
    );

    addActivity('invited teammate', email, 'Team', activeWorkspace.name);
    toast.success(`Invitation sent to ${email}`);
  };

  // Notifications
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // User Profile
  const updateProfile = (profileUpdates) => {
    setUser((prev) => ({ ...prev, ...profileUpdates }));
    toast.success('Profile updated successfully!');
  };

  // Metrics computation
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === 'In Progress' || p.status === 'Review').length,
    assignedTasks: tasks.filter((t) => t.assignee?.name === user.name && t.status !== 'done').length,
    completedTasks: tasks.filter((t) => t.status === 'done').length,
    totalTasks: tasks.length,
  };

  return (
    <WorkspaceContext.Provider
      value={{
        user,
        updateProfile,
        projects,
        addProject,
        updateProject,
        deleteProject,
        tasks,
        addTask,
        updateTaskStatus,
        toggleSubtask,
        deleteTask,
        teams,
        inviteMember,
        activities,
        notifications,
        markAllNotificationsRead,
        clearNotification,
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
        sidebarCollapsed,
        setSidebarCollapsed,
        isMobileNavOpen,
        setIsMobileNavOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
        isNewTaskModalOpen,
        setIsNewTaskModalOpen,
        isInviteModalOpen,
        setIsInviteModalOpen,
        stats,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
