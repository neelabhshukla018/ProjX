import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Shield, ChevronDown, Check } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Avatar from '../common/Avatar';
import toast from 'react-hot-toast';

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, activeWorkspace } = useWorkspace();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    toast.success('Signed out successfully');
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
      >
        <Avatar src={user.avatar} name={user.name} size="sm" status="online" />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-900 leading-tight">
            {user.name}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight">
            {user.title.split(' ')[0]}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-dropdown border border-slate-200/90 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900">{user.name}</p>
            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-semibold border border-brand-200/60">
              <Shield className="w-3 h-3" /> {user.role}
            </div>
          </div>

          <div className="py-1">
            <Link
              to="/app/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              View Profile
            </Link>
            <Link
              to="/app/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Workspace Settings
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1 mt-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
