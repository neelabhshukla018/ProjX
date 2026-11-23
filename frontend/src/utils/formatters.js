/**
 * Formatting utilities for dates, statuses, and numbers
 */

export const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

export const getDaysRemaining = (dueDate) => {
  if (!dueDate) return { text: 'No deadline', isOverdue: false, days: 0 };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)}d overdue`, isOverdue: true, days: diffDays };
  }
  if (diffDays === 0) {
    return { text: 'Due today', isOverdue: false, days: 0, isUrgent: true };
  }
  if (diffDays === 1) {
    return { text: 'Due tomorrow', isOverdue: false, days: 1, isUrgent: true };
  }
  return { text: `${diffDays} days left`, isOverdue: false, days: diffDays };
};

export const getPriorityBadge = (priority) => {
  const p = (priority || 'medium').toLowerCase();
  switch (p) {
    case 'urgent':
      return { label: 'Urgent', bg: 'bg-rose-50 text-rose-700 border-rose-200/80', dot: 'bg-rose-500' };
    case 'high':
      return { label: 'High', bg: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500' };
    case 'medium':
      return { label: 'Medium', bg: 'bg-blue-50 text-blue-700 border-blue-200/80', dot: 'bg-blue-500' };
    case 'low':
    default:
      return { label: 'Low', bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
  }
};

export const getStatusBadge = (status) => {
  const s = (status || '').toLowerCase().replace(/[-_ ]/g, '');
  switch (s) {
    case 'completed':
    case 'done':
      return { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', dot: 'bg-emerald-500' };
    case 'inprogress':
      return { label: 'In Progress', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', dot: 'bg-indigo-500' };
    case 'review':
    case 'inreview':
      return { label: 'In Review', bg: 'bg-purple-50 text-purple-700 border-purple-200/80', dot: 'bg-purple-500' };
    case 'onhold':
      return { label: 'On Hold', bg: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500' };
    case 'todo':
    case 'planning':
    default:
      return { label: 'To Do', bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
  }
};
