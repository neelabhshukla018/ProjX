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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
          Engineering & Product Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
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
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="Average Cycle Time"
          value={2.7}
          suffix=" days"
          trend="-0.4d"
          isPositive={true}
          subtitle="lead-time to shipping"
          icon={Clock}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
        />
        <StatCard
          title="On-Time Delivery"
          value={94.2}
          suffix="%"
          trend="+3.1%"
          isPositive={true}
          subtitle="milestone adherence"
          icon={CheckCircle2}
          iconColor="bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]"
        />
        <StatCard
          title="Active Capacity"
          value={88}
          suffix="%"
          trend="balanced"
          isPositive={true}
          subtitle="across 4 teams"
          icon={Zap}
          iconColor="bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]"
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
                  <stop offset="5%" stopColor="#0F0F0F" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0F0F0F" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
              <XAxis dataKey="month" stroke="#5A5A5A" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5A5A5A" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomAnalyticsTooltip />} />
              <Area
                type="monotone"
                dataKey="velocity"
                stroke="#0F0F0F"
                strokeWidth={2}
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
              <XAxis dataKey="name" stroke="#5A5A5A" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5A5A5A" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomAnalyticsTooltip />} />
              <Bar dataKey="completed" fill="#0F0F0F" radius={[3, 3, 0, 0]} name="Completed Tasks" />
              <Bar dataKey="inProgress" fill="#5A5A5A" radius={[3, 3, 0, 0]} name="In Progress" />
              <Bar dataKey="assigned" fill="#B0B0B0" radius={[3, 3, 0, 0]} name="Total Assigned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
