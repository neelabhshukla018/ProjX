/**
 * Formatting utilities strictly aligned with Pure Monochrome Luxury Design System
 * - Jet Black: #0F0F0F
 * - Pure White: #FFFFFF
 * - Silver Gray: #B0B0B0
 * - Neutral Gray: #2C2C2C
 * - Soft White: #F5F5F5
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
      return {
        label: 'Urgent',
        bg: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
        dot: 'bg-[#FFFFFF]',
      };
    case 'high':
      return {
        label: 'High',
        bg: 'bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]',
        dot: 'bg-[#FFFFFF]',
      };
    case 'medium':
      return {
        label: 'Medium',
        bg: 'bg-[#F5F5F5] text-[#2C2C2C] border-[#D8D8D8]',
        dot: 'bg-[#B0B0B0]',
      };
    case 'low':
    default:
      return {
        label: 'Low',
        bg: 'bg-[#FFFFFF] text-[#5A5A5A] border-[#E5E5E5]',
        dot: 'bg-[#D8D8D8]',
      };
  }
};

export const getStatusBadge = (status) => {
  const s = (status || '').toLowerCase().replace(/[-_ ]/g, '');
  switch (s) {
    case 'completed':
    case 'done':
      return {
        label: 'Completed',
        bg: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
        dot: 'bg-[#FFFFFF]',
      };
    case 'inprogress':
      return {
        label: 'In Progress',
        bg: 'bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]',
        dot: 'bg-[#FFFFFF]',
      };
    case 'review':
    case 'inreview':
      return {
        label: 'In Review',
        bg: 'bg-[#F5F5F5] text-[#2C2C2C] border-[#B0B0B0]',
        dot: 'bg-[#B0B0B0]',
      };
    case 'planning':
    case 'todo':
    default:
      return {
        label: 'To Do',
        bg: 'bg-[#F5F5F5] text-[#5A5A5A] border-[#D8D8D8]',
        dot: 'bg-[#B0B0B0]',
      };
  }
};
