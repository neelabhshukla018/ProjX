import React from 'react';

/**
 * Pure Monochrome Minimal Card Component
 * - Pure white background (#FFFFFF)
 * - Subtle silver-gray borders (#E5E5E5)
 * - Restrained shadows
 * - Responsive padding and fluid width
 */
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
        bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-card
        hover:border-[#B0B0B0]/60 hover:shadow-elevated transition-all duration-200
        w-full min-w-0
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 ${
            headerBorder ? 'border-b border-[#EFEFEF]' : ''
          }`}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm sm:text-base font-semibold text-[#0F0F0F] tracking-tight truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#5A5A5A] mt-0.5 font-normal line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
        </div>
      )}
      <div className={`p-4 sm:p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
