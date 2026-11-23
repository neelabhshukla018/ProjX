import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Card from '../common/Card';
import { weeklyTaskCompletionData } from '../../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg p-2.5 shadow-xl border border-slate-800">
        <p className="font-semibold text-slate-200 mb-1">{label}</p>
        <p className="text-brand-300">
          Completed: <span className="font-bold">{payload[0].value} tasks</span>
        </p>
        {payload[1] && (
          <p className="text-violetAccent-300">
            Planned: <span className="font-bold">{payload[1].value} tasks</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const TaskCompletionChart = () => {
  return (
    <Card
      title="Weekly Task Throughput"
      subtitle="Closed vs planned issues across 7-day cadence"
      className="h-full flex flex-col justify-between"
      bodyClassName="p-4 pt-2 flex-1 flex flex-col justify-center"
    >
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyTaskCompletionData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#4f46e5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompleted)"
              name="Completed"
            />
            <Area
              type="monotone"
              dataKey="planned"
              stroke="#8b5cf6"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorPlanned)"
              name="Planned"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-brand-600" />
          <span>Closed Tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-violetAccent-500 border border-dashed" />
          <span>Sprint Commitment</span>
        </div>
      </div>
    </Card>
  );
};

export default TaskCompletionChart;
