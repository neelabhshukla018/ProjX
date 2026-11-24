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
import { useWorkspace } from '../../hooks/useWorkspace';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F0F0F] text-[#FFFFFF] text-xs rounded-lg p-2.5 shadow-xl border border-[#2C2C2C]">
        <p className="font-semibold text-[#FFFFFF] mb-1">{label}</p>
        <p className="text-[#FFFFFF]">
          Progress: <span className="font-bold text-[#FFFFFF]">{payload[0].value}%</span>
        </p>
        {payload[1] && (
          <p className="text-[#B0B0B0]">
            Target: <span className="font-bold">{payload[1].value}%</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const ProjectProgressChart = () => {
  const { projects } = useWorkspace();

  const chartData = projects.length > 0
    ? projects.map((p) => ({
        name: p.name.length > 15 ? p.name.slice(0, 15) + '…' : p.name,
        progress: p.progress || 0,
        target: 100,
      }))
    : [{ name: 'Initiatives', progress: 0, target: 100 }];

  return (
    <Card
      title="Project Velocity & Progress"
      subtitle="Execution completion across key initiative workstreams"
      className="h-full flex flex-col justify-between"
      bodyClassName="p-3 sm:p-4 pt-2 flex-1 flex flex-col justify-center"
    >
      <div className="w-full h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
            <XAxis
              dataKey="name"
              stroke="#5A5A5A"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#5A5A5A"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="progress"
              fill="#0F0F0F"
              radius={[3, 3, 0, 0]}
              barSize={18}
              name="Current Progress"
            />
            <Bar
              dataKey="target"
              fill="#B0B0B0"
              radius={[3, 3, 0, 0]}
              barSize={18}
              name="Target Milestone"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#5A5A5A] pt-3 border-t border-[#EFEFEF]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#0F0F0F]" />
          <span>Completed Milestone (%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#B0B0B0]" />
          <span>Sprint Target (%)</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectProgressChart;
