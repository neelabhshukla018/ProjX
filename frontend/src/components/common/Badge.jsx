import React from 'react';

/**
 * Pure Monochrome Badge Component (Zero Gold Tint)
 * - default: Soft white / neutral gray with silver-gray border
 * - primary / dark: Jet black (#0F0F0F) surface with white text
 * - neutral: Neutral gray (#2C2C2C) surface with white text
 * - silver: Subtle silver surface
 */
export const Badge = ({
  children,
  variant = 'default',
  dot = false,
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[#F5F5F5] text-[#2C2C2C] border-[#D8D8D8]',
    primary: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#0F0F0F]',
    dark: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
    neutral: 'bg-[#2C2C2C] text-[#FFFFFF] border-[#383838]',
    silver: 'bg-[#EAEAEA] text-[#2C2C2C] border-[#B0B0B0]',
    success: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
    warning: 'bg-[#2C2C2C] text-[#FFFFFF] border-[#3F3F3F]',
    danger: 'bg-[#1A1A1A] text-[#E0E0E0] border-[#505050]',
    // Backward compatibility mappings
    gold: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
    goldSubtle: 'bg-[#F5F5F5] text-[#0F0F0F] border-[#D8D8D8]',
    purple: 'bg-[#2C2C2C] text-[#FFFFFF] border-[#383838]',
    indigo: 'bg-[#0F0F0F] text-[#FFFFFF] border-[#2C2C2C]',
    sky: 'bg-[#F5F5F5] text-[#2C2C2C] border-[#D8D8D8]',
  };

  const dotColors = {
    default: 'bg-[#B0B0B0]',
    primary: 'bg-[#FFFFFF]',
    dark: 'bg-[#FFFFFF]',
    neutral: 'bg-[#B0B0B0]',
    silver: 'bg-[#B0B0B0]',
    gold: 'bg-[#FFFFFF]',
    goldSubtle: 'bg-[#0F0F0F]',
    success: 'bg-[#FFFFFF]',
    warning: 'bg-[#FFFFFF]',
    danger: 'bg-[#808080]',
    purple: 'bg-[#B0B0B0]',
    indigo: 'bg-[#FFFFFF]',
    sky: 'bg-[#B0B0B0]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-0.5 rounded-full font-medium',
    lg: 'text-xs px-3 py-1 rounded-full font-semibold',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 border font-sans tracking-tight shrink-0
        ${variantStyles[variant] || variantStyles.default}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColors[variant] || dotColors.default
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
