import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Clock } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { formatRelativeTime } from '../../utils/formatters';

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAllNotificationsRead, clearNotification } = useWorkspace();
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-[#2C2C2C] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0F0F0F] ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-[#FFFFFF] rounded-xl shadow-dropdown border border-[#E5E5E5] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-3 border-b border-[#EFEFEF] flex items-center justify-between bg-[#F5F5F5]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F]">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs text-[#5A5A5A] font-medium">
                  ({unreadCount} unread)
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-xs text-[#0F0F0F] hover:text-[#5A5A5A] font-medium flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-[#EFEFEF]">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#B0B0B0]">
                No notifications right now
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 hover:bg-[#F5F5F5] transition-colors flex items-start justify-between gap-3 ${
                    !item.read ? 'bg-[#FAFAFA]' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F0F0F] truncate">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#5A5A5A] mt-1 line-clamp-2">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-[#B0B0B0] mt-1.5 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => clearNotification(item.id)}
                    className="text-[#B0B0B0] hover:text-[#0F0F0F] p-1 text-xs shrink-0"
                    title="Dismiss"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
