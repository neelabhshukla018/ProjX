import React from 'react';

/**
 * Pure Monochrome Avatar Component (No Gold Tint)
 * - Fallback with Jet Black (#0F0F0F) background & Pure White monogram
 * - Crisp status rings (online / busy / offline)
 */
export const Avatar = ({
  src,
  name = 'User',
  size = 'md',
  status, // 'online' | 'busy' | 'offline'
  className = '',
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 sm:w-8 h-7 sm:h-8 text-xs',
    md: 'w-8 sm:w-9 h-8 sm:h-9 text-xs',
    lg: 'w-10 sm:w-11 h-10 sm:h-11 text-sm',
    xl: 'w-14 sm:w-16 h-14 sm:h-16 text-base',
  };

  const statusColors = {
    online: 'bg-[#0F0F0F] ring-white',
    busy: 'bg-[#2C2C2C] ring-white',
    offline: 'bg-[#B0B0B0] ring-white',
  };

  const getInitials = (n) => {
    if (!n) return 'PX';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size] || sizes.md} rounded-full object-cover border border-[#D8D8D8] bg-[#F5F5F5]`}
        />
      ) : (
        <div
          className={`
            ${sizes[size] || sizes.md} rounded-full flex items-center justify-center
            bg-[#0F0F0F] text-[#FFFFFF] font-semibold border border-[#2C2C2C] tracking-tight
          `}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block w-2 h-2 rounded-full ring-2
            ${statusColors[status] || statusColors.online}
          `}
        />
      )}
    </div>
  );
};

export default Avatar;
