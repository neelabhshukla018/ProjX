import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'indigo',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    indigo: 'bg-brand-600',
    violet: 'bg-violetAccent-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-600">
          <span>Progress</span>
          <span className="font-semibold text-slate-800">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color] || colorClasses.indigo}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
