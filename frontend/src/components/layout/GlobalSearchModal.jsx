import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderKanban, CheckSquare, Users, ArrowRight } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';

export const GlobalSearchModal = () => {
  const { isGlobalSearchOpen, setIsGlobalSearchOpen, projects, tasks, teams } = useWorkspace();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allMembers = useMemo(() => {
    const list = [];
    teams.forEach((t) => {
      (t.members || []).forEach((m) => {
        if (!list.find((x) => x.id === m.id)) {
          list.push(m);
        }
      });
    });
    return list;
  }, [teams]);

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects.slice(0, 3);
    const q = query.toLowerCase();
    return projects.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [projects, query]);

  const filteredTasks = useMemo(() => {
    if (!query.trim()) return tasks.slice(0, 3);
    const q = query.toLowerCase();
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || (t.projectName && t.projectName.toLowerCase().includes(q))
    );
  }, [tasks, query]);

  const filteredMembers = useMemo(() => {
    if (!query.trim()) return allMembers.slice(0, 2);
    const q = query.toLowerCase();
    return allMembers.filter(
      (m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
  }, [allMembers, query]);

  const handleSelect = (path) => {
    setIsGlobalSearchOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <Modal
      isOpen={isGlobalSearchOpen}
      onClose={() => {
        setIsGlobalSearchOpen(false);
        setQuery('');
      }}
      maxWidth="max-w-2xl"
      showClose={false}
    >
      <div className="-m-4 sm:-m-6">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#EFEFEF] flex items-center gap-2.5 sm:gap-3 bg-[#FFFFFF]">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-[#0F0F0F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search projects, tasks, teammates..."
            className="w-full text-xs sm:text-sm bg-transparent text-[#0F0F0F] placeholder-[#B0B0B0] outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-[#5A5A5A] bg-[#F5F5F5] border border-[#D8D8D8] rounded shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[55vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {/* Projects Category */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#808080] tracking-wider uppercase mb-1.5 px-2">
                <FolderKanban className="w-3.5 h-3.5 text-[#0F0F0F]" />
                Projects
              </div>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelect('/app/projects')}
                    className="w-full p-2.5 rounded-lg hover:bg-[#F5F5F5] text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-[#0F0F0F] truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-[#5A5A5A] truncate">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium text-[#2C2C2C] bg-[#F5F5F5] px-2 py-0.5 rounded-full border border-[#D8D8D8]">
                        {p.progress}%
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B0B0B0] group-hover:text-[#0F0F0F] transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Category */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#808080] tracking-wider uppercase mb-1.5 px-2">
                <CheckSquare className="w-3.5 h-3.5 text-[#0F0F0F]" />
                Tasks
              </div>
              <div className="space-y-1">
                {filteredTasks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect('/app/tasks')}
                    className="w-full p-2.5 rounded-lg hover:bg-[#F5F5F5] text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-[#0F0F0F] truncate">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-[#5A5A5A] truncate">{t.projectName}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium text-[#0F0F0F] bg-[#F5F5F5] px-2 py-0.5 rounded-full border border-[#D8D8D8]">
                        {t.priority}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B0B0B0] group-hover:text-[#0F0F0F] transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {filteredMembers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#808080] tracking-wider uppercase mb-1.5 px-2">
                <Users className="w-3.5 h-3.5 text-[#0F0F0F]" />
                Teammates
              </div>
              <div className="space-y-1">
                {filteredMembers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelect('/app/teams')}
                    className="w-full p-2.5 rounded-lg hover:bg-[#F5F5F5] text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#D8D8D8] shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs font-semibold text-[#0F0F0F] truncate">{m.name}</p>
                        <p className="text-[11px] text-[#5A5A5A] truncate">{m.role}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B0B0B0] group-hover:text-[#0F0F0F] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="p-3 bg-[#F5F5F5] border-t border-[#EFEFEF] flex items-center justify-between text-[11px] text-[#5A5A5A]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#D8D8D8] rounded text-[#0F0F0F]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#D8D8D8] rounded text-[#0F0F0F]">↵</kbd> Select
            </span>
          </div>
          <span className="text-[#808080] text-[10px]">Proj𝕏</span>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalSearchModal;
