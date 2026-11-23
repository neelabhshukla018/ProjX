import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { animateCounter } from '../../utils/animations';

export const StatCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = '+12%',
  isPositive = true,
  subtitle = 'vs last month',
  icon: Icon,
  iconColor = 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
}) => {
  const numberRef = useRef(null);

  useEffect(() => {
    if (numberRef.current && typeof value === 'number') {
      animateCounter(numberRef.current, value, 1000, prefix, suffix);
    }
  }, [value, prefix, suffix]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 sm:p-5 shadow-card hover:border-[#B0B0B0]/60 hover:shadow-elevated transition-all duration-200">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div
            className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center border shrink-0 ${iconColor}`}
          >
            <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1.5 sm:mb-2">
        <h3
          ref={numberRef}
          className="text-2xl sm:text-3xl font-bold text-[#0F0F0F] tracking-tight"
        >
          {prefix}
          {value}
          {suffix}
        </h3>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center font-semibold ${
            isPositive ? 'text-[#0F0F0F]' : 'text-[#5A5A5A]'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0F0F0F]" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-[#5A5A5A]" />
          )}
          {trend}
        </span>
        <span className="text-[#B0B0B0] font-normal truncate">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatCard;
