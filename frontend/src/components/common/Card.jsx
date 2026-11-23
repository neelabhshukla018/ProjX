import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerBorder = false,
  bodyClassName = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white border border-slate-200/80 rounded-xl shadow-card
        hover:shadow-elevated transition-shadow duration-200
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-5 py-4 flex items-center justify-between gap-4 ${
            headerBorder ? 'border-b border-slate-100' : ''
          }`}
        >
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
