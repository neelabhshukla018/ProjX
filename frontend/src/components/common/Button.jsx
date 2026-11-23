import React from 'react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm border border-brand-700/20 focus:ring-brand-500/30',
  secondary: 'bg-violetAccent-50 text-violetAccent-700 hover:bg-violetAccent-100 border border-violetAccent-200/60 focus:ring-violetAccent-500/30',
  outline: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-subtle hover:border-slate-300 focus:ring-slate-400/20',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 border border-transparent focus:ring-slate-400/20',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm border border-rose-700/20 focus:ring-rose-500/30',
  dark: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-slate-950 focus:ring-slate-600/30',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs font-medium rounded-md gap-1.5',
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-2',
  md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5',
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
          disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
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
