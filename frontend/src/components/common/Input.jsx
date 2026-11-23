import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Pure Monochrome Minimal Input Component
 * - Clean minimal styling
 * - Clear labels and helpful validation
 * - Fully responsive with touch accessibility
 */
export const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = '',
      inputClassName = '',
      id,
      name,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight"
          >
            {label} {required && <span className="text-[#0F0F0F] font-bold">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-subtle">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A5A5A]">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={computedType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full rounded-lg text-xs sm:text-sm bg-[#FFFFFF] border text-[#0F0F0F] placeholder-[#B0B0B0]
              transition-all duration-150 py-2 sm:py-2.5 outline-none
              ${LeftIcon ? 'pl-9' : 'pl-3 sm:pl-3.5'}
              ${isPassword || RightIcon ? 'pr-10' : 'pr-3 sm:pr-3.5'}
              ${
                error
                  ? 'border-[#0F0F0F] focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]'
                  : 'border-[#D8D8D8] hover:border-[#B0B0B0] focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]'
              }
              disabled:bg-[#F5F5F5] disabled:text-[#B0B0B0] disabled:cursor-not-allowed
              ${inputClassName}
            `}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5A5A5A] hover:text-[#0F0F0F] transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : RightIcon ? (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#5A5A5A]">
              <RightIcon className="w-4 h-4" />
            </div>
          ) : null}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-[#0F0F0F] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-[#5A5A5A]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
