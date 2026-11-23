import React, { useState } from 'react';
import {
  FolderKanban,
  Clock,
  TrendingUp,
  CheckCircle2,
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

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Personalized Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-0.5">
            {currentDate} • High-velocity project telemetry and sprint throughput.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F0F0F] text-[#FFFFFF] text-xs font-semibold border border-[#2C2C2C] shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] animate-pulse" />
            Workspace Nominal
          </span>
        </div>
      </div>

      {/* 4 Stat Cards with Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          trend="+18%"
          isPositive={true}
          subtitle="across 4 teams"
          icon={FolderKanban}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          trend="3 on track"
          isPositive={true}
          subtitle="94% velocity"
          icon={TrendingUp}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Assigned Tasks"
          value={stats.assignedTasks}
          trend="6 urgent"
          isPositive={false}
          subtitle="due this sprint"
          icon={Clock}
          iconColor="bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          trend="+24%"
          isPositive={true}
          subtitle="this milestone"
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
