import React from 'react';
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
import { Zap, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { monthlyVelocityTrend, teamWorkloadData } from '../utils/mockData';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Engineering & Product Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Deep telemetry into team velocity, cycle times, throughput, and capacity distribution.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sprint Velocity"
          value={96}
          suffix=" pts"
          trend="+8.2%"
          isPositive={true}
          subtitle="vs previous cycle"
          icon={TrendingUp}
          iconColor="text-brand-600 bg-brand-50 border-brand-200/60"
        />
        <StatCard
          title="Average Cycle Time"
          value={2.7}
          suffix=" days"
          trend="-0.4d"
          isPositive={true}
          subtitle="lead-time to shipping"
          icon={Clock}
          iconColor="text-emerald-600 bg-emerald-50 border-emerald-200/60"
        />
        <StatCard
          title="On-Time Delivery"
          value={94.2}
          suffix="%"
          trend="+3.1%"
          isPositive={true}
          subtitle="milestone adherence"
          icon={CheckCircle2}
          iconColor="text-violetAccent-600 bg-violetAccent-50 border-violetAccent-200/60"
        />
        <StatCard
          title="Active Capacity"
          value={88}
          suffix="%"
          trend="balanced"
          isPositive={true}
          subtitle="across 4 teams"
          icon={Zap}
          iconColor="text-sky-600 bg-sky-50 border-sky-200/60"
        />
      </div>

      {/* Monthly Velocity Trend Chart */}
      <Card
        title="Monthly Sprint Velocity (Points Shipped)"
        subtitle="Tracking aggregate story points and tasks closed from June to November 2026"
        headerBorder
      >
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyVelocityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="velocity"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fill="url(#velocityGrad)"
                name="Velocity Points"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Team Workload Distribution */}
      <Card
        title="Team Workload & Capacity Allocation"
        subtitle="Current task distribution across senior team members"
        headerBorder
      >
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamWorkloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed Tasks" />
              <Bar dataKey="inProgress" fill="#4f46e5" radius={[4, 4, 0, 0]} name="In Progress" />
              <Bar dataKey="assigned" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Total Assigned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
