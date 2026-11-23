import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
            className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight"
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-subtle">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
              w-full rounded-lg text-sm bg-white border text-slate-900 placeholder-slate-400
              transition-colors duration-150 py-2.5 outline-none
              ${LeftIcon ? 'pl-9' : 'pl-3.5'}
              ${isPassword || RightIcon ? 'pr-10' : 'pr-3.5'}
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
              }
              disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
              ${inputClassName}
            `}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : (
            RightIcon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <RightIcon className="w-4 h-4" />
              </div>
            )
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 mt-1.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
