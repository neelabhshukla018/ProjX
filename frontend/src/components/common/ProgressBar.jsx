import React from 'react';

/**
 * Pure Monochrome ProgressBar
 * Default: Jet Black (#0F0F0F)
 * Neutral: Neutral Gray (#2C2C2C)
 * Silver: Silver Gray (#B0B0B0)
 */
export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'black',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  };

  const colorClasses = {
    black: 'bg-[#0F0F0F]',
    neutral: 'bg-[#2C2C2C]',
    silver: 'bg-[#B0B0B0]',
    // Legacy / alias mappings to pure monochrome
    gold: 'bg-[#0F0F0F]',
    indigo: 'bg-[#0F0F0F]',
    violet: 'bg-[#2C2C2C]',
    emerald: 'bg-[#0F0F0F]',
    amber: 'bg-[#2C2C2C]',
    rose: 'bg-[#2C2C2C]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-[#5A5A5A]">
          <span>Progress</span>
          <span className="font-semibold text-[#0F0F0F]">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-[#EFEFEF] rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color] || colorClasses.black}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
