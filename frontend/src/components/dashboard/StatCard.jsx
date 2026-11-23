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
  iconColor = 'text-brand-600 bg-brand-50 border-brand-200/60',
}) => {
  const numberRef = useRef(null);

  useEffect(() => {
    if (numberRef.current && typeof value === 'number') {
      animateCounter(numberRef.current, value, 1000, prefix, suffix);
    }
  }, [value, prefix, suffix]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-card hover:shadow-elevated transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${iconColor}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <h3
          ref={numberRef}
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
        >
          {prefix}
          {value}
          {suffix}
        </h3>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center font-semibold ${
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {trend}
        </span>
        <span className="text-slate-400 font-normal">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatCard;
