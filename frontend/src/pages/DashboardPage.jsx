import React, { useMemo } from 'react';
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

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentDate} • Here is a breakdown of your team's project velocity today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Workspace Healthy
          </span>
        </div>
      </div>

      {/* 4 Stat Cards with Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          trend="+18%"
          isPositive={true}
          subtitle="across 4 teams"
          icon={FolderKanban}
          iconColor="text-brand-600 bg-brand-50 border-brand-200/60"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          trend="3 on track"
          isPositive={true}
          subtitle="94% velocity"
          icon={TrendingUp}
          iconColor="text-violetAccent-600 bg-violetAccent-50 border-violetAccent-200/60"
        />
        <StatCard
          title="Assigned Tasks"
          value={stats.assignedTasks}
          trend="6 urgent"
          isPositive={false}
          subtitle="due this sprint"
          icon={Clock}
          iconColor="text-amber-600 bg-amber-50 border-amber-200/60"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          trend="+24%"
          isPositive={true}
          subtitle="this milestone"
          icon={CheckCircle2}
          iconColor="text-emerald-600 bg-emerald-50 border-emerald-200/60"
        />
      </div>

      {/* Quick Action Bar */}
      <QuickActionsBar />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectProgressChart />
        <TaskCompletionChart />
      </div>

      {/* 3 Widgets Grid: Projects, Deadlines, Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentProjectsCard projects={projects} />
        <UpcomingDeadlinesCard />
        <ActivityFeedCard activities={activities} />
      </div>
    </div>
  );
};

export default DashboardPage;
