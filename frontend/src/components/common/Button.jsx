import React from 'react';

/**
 * Pure Monochrome Minimal Button Component
 * Primary: Jet-black background, white text, hover transition (#2C2C2C)
 * Secondary: White background, black text, silver-gray border (#B0B0B0)
 * Accent: Neutral dark surface (#2C2C2C), white text, hover (#171717)
 */
const variants = {
  primary: 'bg-[#0F0F0F] text-[#FFFFFF] hover:bg-[#2C2C2C] border border-[#0F0F0F] shadow-sm focus:ring-[#0F0F0F]/30',
  secondary: 'bg-[#FFFFFF] text-[#0F0F0F] hover:bg-[#F5F5F5] border border-[#B0B0B0] shadow-subtle focus:ring-[#B0B0B0]/30',
  accent: 'bg-[#2C2C2C] text-[#FFFFFF] hover:bg-[#1A1A1A] border border-[#3A3A3A] shadow-sm focus:ring-[#2C2C2C]/30',
  outline: 'bg-transparent text-[#0F0F0F] hover:bg-[#F5F5F5] border border-[#D4D4D4] focus:ring-[#B0B0B0]/20',
  ghost: 'bg-transparent text-[#2C2C2C] hover:bg-[#EAEAEA] hover:text-[#0F0F0F] border border-transparent focus:ring-[#B0B0B0]/20',
  dark: 'bg-[#171717] text-[#FFFFFF] hover:bg-[#262626] border border-[#333333] hover:border-[#4B4B4B] shadow-sm focus:ring-white/20',
  white: 'bg-[#FFFFFF] text-[#0F0F0F] hover:bg-[#EAEAEA] border border-[#FFFFFF] shadow-sm focus:ring-white/30',
  danger: 'bg-[#1F1F1F] text-[#FFFFFF] hover:bg-[#2C2C2C] border border-[#404040] focus:ring-[#2C2C2C]/20',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs font-medium rounded-md gap-1.5',
  sm: 'px-3 py-1.5 text-xs font-medium rounded-md gap-2',
  md: 'px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg gap-2',
  lg: 'px-4 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-lg gap-2.5',
};

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      isLoading = false,
      disabled = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`
          inline-flex items-center justify-center font-sans tracking-tight
          transition-all duration-150 ease-out select-none
          active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100
          ${variants[variant] || variants.primary}
          ${sizes[size] || sizes.md}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
        {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
