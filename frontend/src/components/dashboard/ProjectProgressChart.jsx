import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Card from '../common/Card';
import { projectProgressChartData } from '../../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg p-2.5 shadow-xl border border-slate-800">
        <p className="font-semibold text-slate-200 mb-1">{label}</p>
        <p className="text-brand-300">
          Progress: <span className="font-bold">{payload[0].value}%</span>
        </p>
        {payload[1] && (
          <p className="text-slate-400">
            Target: <span className="font-bold">{payload[1].value}%</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const ProjectProgressChart = () => {
  return (
    <Card
      title="Project Velocity & Progress"
      subtitle="Execution completion across key initiative workstreams"
      className="h-full flex flex-col justify-between"
      bodyClassName="p-4 pt-2 flex-1 flex flex-col justify-center"
    >
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectProgressChartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
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
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="progress"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              barSize={24}
              name="Current Progress"
            />
            <Bar
              dataKey="target"
              fill="#c7d2fe"
              radius={[4, 4, 0, 0]}
              barSize={24}
              name="Target Milestone"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-brand-600" />
          <span>Completed Milestone (%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-brand-200" />
          <span>Sprint Target (%)</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectProgressChart;
