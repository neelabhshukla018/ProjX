import React, { useState } from 'react';
import {
  FolderKanban,
  Clock,
  TrendingUp,
  CheckCircle2,
  Shield,
  UserCheck,
} from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import StatCard from '../components/dashboard/StatCard';
import ProjectProgressChart from '../components/dashboard/ProjectProgressChart';
import TaskCompletionChart from '../components/dashboard/TaskCompletionChart';
import RecentProjectsCard from '../components/dashboard/RecentProjectsCard';
import UpcomingDeadlinesCard from '../components/dashboard/UpcomingDeadlinesCard';
import ActivityFeedCard from '../components/dashboard/ActivityFeedCard';
import QuickActionsBar from '../components/dashboard/QuickActionsBar';

export const DashboardPage = () => {
  const { user, stats, projects, activities } = useWorkspace();

  const [currentDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  });

  const displayName = (user?.fullName || user?.name || 'User').split(' ')[0];
  const isPM = user?.role === 'project_manager';

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Personalized Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-0.5">
            {currentDate} • {isPM ? 'Project Manager Dashboard' : 'Team Member Dashboard'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F0F0F] text-white text-xs font-semibold">
            {isPM ? <Shield className="w-3.5 h-3.5 text-white" /> : <UserCheck className="w-3.5 h-3.5 text-white" />}
            {isPM ? 'Project Manager' : 'Team Member'}
          </span>
        </div>
      </div>

      {/* 4 Stat Cards with Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          title={isPM ? 'Managed Projects' : 'My Projects'}
          value={stats.totalProjects}
          trend={isPM ? 'Active Portfolios' : 'Accepted Initiatives'}
          isPositive={true}
          subtitle={isPM ? 'across your teams' : 'collaborative roles'}
          icon={FolderKanban}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          trend="In Progress"
          isPositive={true}
          subtitle="milestone sprints"
          icon={TrendingUp}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title={isPM ? 'Assigned Tasks' : 'My Open Tasks'}
          value={stats.assignedTasks}
          trend="In Action"
          isPositive={false}
          subtitle="requiring execution"
          icon={Clock}
          iconColor="bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          trend="Finished"
          isPositive={true}
          subtitle="verified deliverables"
          icon={CheckCircle2}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
      </div>

      {/* Quick Action Bar */}
      <QuickActionsBar />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ProjectProgressChart />
        <TaskCompletionChart />
      </div>

      {/* 3 Widgets Grid: Projects, Deadlines, Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RecentProjectsCard projects={projects} />
        <UpcomingDeadlinesCard />
        <ActivityFeedCard activities={activities} />
      </div>
    </div>
  );
};

export default DashboardPage;
