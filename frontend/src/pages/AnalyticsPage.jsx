import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Card from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import { Zap, Clock, CheckCircle2, TrendingUp, FolderKanban } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';

const CustomAnalyticsTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F0F0F] text-[#FFFFFF] text-xs rounded-lg p-2.5 shadow-xl border border-[#2C2C2C]">
        <p className="font-semibold text-[#FFFFFF] mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-[#B0B0B0]">
            {entry.name}: <span className="font-bold text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsPage = () => {
  const { projects, tasks, stats } = useWorkspace();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed' || t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress' || t.status === 'in_progress').length;
  const inReviewTasks = tasks.filter((t) => t.status === 'In Review').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do' || t.status === 'todo').length;

  const velocityPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Task Status Distribution for BarChart
  const taskStatusData = [
    { name: 'To Do', count: todoTasks },
    { name: 'In Progress', count: inProgressTasks },
    { name: 'In Review', count: inReviewTasks },
    { name: 'Completed', count: completedTasks },
  ];

  // Project Progress Breakdown for Chart
  const projectProgressData = useMemo(() => {
    if (projects.length === 0) {
      return [
        { name: 'Planning', progress: 0 },
        { name: 'Recruiting', progress: 0 },
        { name: 'In Progress', progress: 0 },
        { name: 'Completed', progress: 100 },
      ];
    }
    return projects.slice(0, 6).map((p) => ({
      name: p.name.length > 14 ? `${p.name.slice(0, 14)}...` : p.name,
      progress: p.progress || 0,
      tasks: (p.members || []).length,
    }));
  }, [projects]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
          Engineering & Product Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Real-time metrics computed directly from your active database projects and sprint tasks.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Velocity"
          value={velocityPercent}
          suffix="%"
          trend="Sprint completion"
          isPositive={velocityPercent >= 50}
          subtitle="across all tasks"
          icon={TrendingUp}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Total Initiatives"
          value={projects.length}
          suffix=" projects"
          trend="Active portfolio"
          isPositive={true}
          subtitle="managed & joined"
          icon={FolderKanban}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          suffix={`/${totalTasks}`}
          trend="Finished deliverables"
          isPositive={true}
          subtitle="milestone adherence"
          icon={CheckCircle2}
          iconColor="bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]"
        />
        <StatCard
          title="Tasks In Action"
          value={inProgressTasks + inReviewTasks}
          suffix=" active"
          trend="In execution"
          isPositive={false}
          subtitle="in progress or review"
          icon={Clock}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Progress */}
        <Card
          title="Project Milestone Progress"
          subtitle="Completion percentages derived dynamically from associated tasks"
          headerBorder
        >
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5A5A5A' }} stroke="#D8D8D8" />
                <YAxis tick={{ fontSize: 11, fill: '#5A5A5A' }} stroke="#D8D8D8" domain={[0, 100]} />
                <Tooltip content={<CustomAnalyticsTooltip />} />
                <Bar dataKey="progress" fill="#0F0F0F" radius={[4, 4, 0, 0]} name="Progress (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Task Status Distribution */}
        <Card
          title="Task Status Pipeline Breakdown"
          subtitle="Real-time distribution of deliverables across execution stages"
          headerBorder
        >
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5A5A5A' }} stroke="#D8D8D8" />
                <YAxis tick={{ fontSize: 11, fill: '#5A5A5A' }} stroke="#D8D8D8" allowDecimals={false} />
                <Tooltip content={<CustomAnalyticsTooltip />} />
                <Bar dataKey="count" fill="#2C2C2C" radius={[4, 4, 0, 0]} name="Tasks Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
