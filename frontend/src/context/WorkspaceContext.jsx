import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { WorkspaceContext } from './WorkspaceContextInstance';
import api, { API_ORIGIN } from '../services/api';

export const WorkspaceProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('projx_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Active workspace metadata
  const activeWorkspace = useMemo(() => {
    if (!user) return { name: 'ProjX Hub', role: 'Guest', membersCount: 1 };
    return {
      name: user.role === 'project_manager' ? 'PM Command Center' : 'Team Collaboration Hub',
      role: user.role === 'project_manager' ? 'Project Manager' : 'Team Member',
      membersCount: 12,
    };
  }, [user]);

  const workspaces = [
    { id: 'ws-1', name: 'ProjX Workspace', role: user?.role === 'project_manager' ? 'Project Manager' : 'Team Member', membersCount: 12 },
  ];

  // Helper to persist user
  const setPersistedUser = (u) => {
    setUser(u);
    if (u) {
      localStorage.setItem('projx_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('projx_user');
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
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

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await api.get('/notifications');
      if (res && res.notifications) {
        setNotifications(res.notifications);
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch projects, tasks, and notifications from API
  const fetchWorkspaceData = useCallback(async (currentUser = user) => {
    if (!currentUser) return;
    try {
      // 1. Fetch user's relevant projects (My Projects)
      const myProjRes = await api.get('/projects/my-projects').catch(() => ({ projects: [] }));
      const myProjs = myProjRes?.projects || [];
      setProjects(myProjs);

      // 2. Fetch all projects (for exploring / search)
      const allProjRes = await api.get('/projects').catch(() => ({ projects: [] }));
      const allProjs = allProjRes?.projects || [];
      setAllProjects(allProjs);

      // 3. Fetch tasks
      const taskRes = await api.get('/tasks/my-tasks').catch(() => ({ tasks: [] }));
      const userTasks = taskRes?.tasks || [];
      setTasks(userTasks);

      // 4. Fetch team member's applications if applicable
      if (currentUser.role === 'team_member') {
        const appRes = await api.get('/applications/my-applications').catch(() => ({ applications: [] }));
        setMyApplications(appRes?.applications || []);
      }

      // 5. Fetch notifications
      await fetchNotifications();

      // Generate activity items based on real project & task events
      const genActivities = [];
      myProjs.slice(0, 3).forEach((p) => {
        genActivities.push({
          id: `act-p-${p._id}`,
          user: {
            name: p.owner?.fullName || currentUser.fullName,
            avatar: p.owner?.profilePhoto ? `${API_ORIGIN}${p.owner.profilePhoto}` : '',
          },
          action: 'active initiative',
          target: p.name,
          targetType: 'Project',
          project: p.name,
          timestamp: p.createdAt || new Date().toISOString(),
        });
      });

      userTasks.slice(0, 4).forEach((t) => {
        genActivities.push({
          id: `act-t-${t._id}`,
          user: {
            name: t.assignedTo?.fullName || currentUser.fullName,
            avatar: t.assignedTo?.profilePhoto ? `${API_ORIGIN}${t.assignedTo.profilePhoto}` : '',
          },
          action: `marked task as ${t.status}`,
          target: t.title,
          targetType: 'Task',
          project: t.project?.name || 'General',
          timestamp: t.updatedAt || new Date().toISOString(),
        });
      });

      setActivities(genActivities);
    } catch (err) {
      console.warn('[Workspace Data Error]:', err.message);
    }
  }, [user]);

  // Initial authentication check
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      try {
        const res = await api.get('/auth/me');
        if (isMounted && res.user) {
          setPersistedUser(res.user);
          await fetchWorkspaceData(res.user);
        }
      } catch {
        if (isMounted) {
          setPersistedUser(null);
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    verifyAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Periodic notification polling every 15s
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetchNotifications();
    }, 15000);
    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  // Authentication: Register
  const register = async ({ fullName, email, password, confirmPassword, role }) => {
    const res = await api.post('/auth/register', {
      fullName,
      email,
      password,
      confirmPassword,
      role,
    });
    setPersistedUser(res.user);
    toast.success(`Welcome to ProjX, ${res.user.fullName}!`);
    await fetchWorkspaceData(res.user);
    return res.user;
  };

  // Authentication: Login
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setPersistedUser(res.user);
    toast.success(`Welcome back, ${res.user.fullName}!`);
    await fetchWorkspaceData(res.user);
    return res.user;
  };

  // Authentication: Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    }
    setPersistedUser(null);
    setProjects([]);
    setTasks([]);
    setMyApplications([]);
    setNotifications([]);
    toast.success('Signed out successfully');
  };

  // Project management
  const addProject = async (formDataOrObject) => {
    try {
      let res;
      if (formDataOrObject instanceof FormData) {
        res = await api.post('/projects', formDataOrObject, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/projects', formDataOrObject);
      }
      toast.success(res.message || 'Project created successfully!');
      await fetchWorkspaceData(user);
      setIsNewProjectModalOpen(false);
      return res.project;
    } catch (err) {
      toast.error(err.message || 'Failed to create project');
      throw err;
    }
  };

  const updateProject = async (projectId, updates) => {
    try {
      let res;
      if (updates instanceof FormData) {
        res = await api.put(`/projects/${projectId}`, updates, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.put(`/projects/${projectId}`, updates);
      }
      toast.success(res.message || 'Project updated');
      await fetchWorkspaceData(user);
      return res.project;
    } catch (err) {
      toast.error(err.message || 'Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const res = await api.delete(`/projects/${projectId}`);
      toast.success(res.message || 'Project removed');
      await fetchWorkspaceData(user);
    } catch (err) {
      toast.error(err.message || 'Failed to delete project');
      throw err;
    }
  };

  // Application management
  const applyToProject = async (projectId) => {
    try {
      const res = await api.post('/applications', { projectId });
      toast.success(res.message || 'Expressed interest! Application is pending review.');
      await fetchWorkspaceData(user);
      return res.application;
    } catch (err) {
      toast.error(err.message || 'Failed to apply to project');
      throw err;
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await api.put(`/applications/${applicationId}/status`, { status });
      toast.success(res.message || `Application ${status.toLowerCase()}`);
      await fetchWorkspaceData(user);
      return res.application;
    } catch (err) {
      toast.error(err.message || 'Failed to update application');
      throw err;
    }
  };

  // Task management
  const addTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      toast.success(res.message || 'Task created successfully');
      await fetchWorkspaceData(user);
      setIsNewTaskModalOpen(false);
      return res.task;
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
      throw err;
    }
  };

  const updateTaskStatus = async (taskId, newStatus, progressUpdate) => {
    try {
      const payload = { status: newStatus };
      if (progressUpdate !== undefined) payload.progressUpdate = progressUpdate;
      const res = await api.put(`/tasks/${taskId}`, payload);
      toast.success(res.message || 'Task status updated');
      await fetchWorkspaceData(user);
      return res.task;
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/tasks/${taskId}`);
      toast.success(res.message || 'Task removed');
      await fetchWorkspaceData(user);
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
      throw err;
    }
  };

  // Profile management
  const updateProfile = async (profileUpdates) => {
    try {
      const res = await api.put('/users/profile', profileUpdates);
      setPersistedUser(res.user);
      toast.success('Profile updated successfully!');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
      throw err;
    }
  };

  const uploadProfilePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const res = await api.post('/users/profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPersistedUser(res.user);
      toast.success('Profile photo updated!');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Failed to upload photo');
      throw err;
    }
  };

  const uploadResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await api.post('/users/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPersistedUser(res.user);
      toast.success('Resume uploaded successfully!');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Failed to upload resume');
      throw err;
    }
  };

  const deleteResume = async () => {
    try {
      const res = await api.delete('/users/profile/resume');
      setPersistedUser(res.user);
      toast.success('Resume removed');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Failed to remove resume');
      throw err;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.put('/auth/change-password', { currentPassword, newPassword });
      toast.success(res.message || 'Password changed successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
      throw err;
    }
  };

  // Notification management
  const markNotificationAsRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.warn('Failed to mark notification read:', err.message);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const clearNotification = async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      setNotifications((prev) =>
        prev.filter((n) => n._id !== notificationId && n.id !== notificationId)
      );
    } catch (err) {
      console.warn('Failed to delete notification:', err.message);
    }
  };

  // Real database metrics computation
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(
      (p) => p.status === 'In Progress' || p.status === 'Recruiting' || p.status === 'Planning'
    ).length;
    const assignedTasks = tasks.filter((t) => t.status !== 'Completed').length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const totalTasks = tasks.length;

    return {
      totalProjects,
      activeProjects,
      assignedTasks,
      completedTasks,
      totalTasks,
    };
  }, [projects, tasks]);

  // Teams list derived from members of user projects
  const teams = useMemo(() => {
    const memberMap = new Map();
    projects.forEach((proj) => {
      if (proj.members && Array.isArray(proj.members)) {
        proj.members.forEach((m) => {
          if (m && m._id && !memberMap.has(m._id)) {
            memberMap.set(m._id, {
              id: m._id,
              name: m.fullName || 'Member',
              email: m.email || '',
              role: m.role === 'project_manager' ? 'Project Manager' : 'Team Member',
              department: m.skills?.[0] || 'Engineering',
              avatar: m.profilePhoto ? `${API_ORIGIN}${m.profilePhoto}` : '',
              skills: m.skills || [],
              experience: m.experience || '',
              resume: m.resume || '',
            });
          }
        });
      }
    });

    const membersList = Array.from(memberMap.values());
    return [
      {
        id: 'team-active',
        name: user?.role === 'project_manager' ? 'My Project Collaborators' : 'Project Teams',
        department: 'Active Workgroup',
        description: 'Verified team members and collaborators working on active project sprints.',
        memberCount: membersList.length,
        activeProjectsCount: projects.length,
        members: membersList,
      },
    ];
  }, [projects, user]);

  return (
    <WorkspaceContext.Provider
      value={{
        user,
        authLoading,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
        fetchWorkspaceData,
        projects,
        allProjects,
        addProject,
        updateProject,
        deleteProject,
        myApplications,
        applyToProject,
        updateApplicationStatus,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        teams,
        activities,
        notifications,
        fetchNotifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        clearNotification,
        updateProfile,
        uploadProfilePhoto,
        uploadResume,
        deleteResume,
        changePassword,
        workspaces,
        activeWorkspace,
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
