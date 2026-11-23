import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderKanban, CheckSquare, Users, ArrowRight, CornerDownLeft } from 'lucide-react';
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
      <div className="-m-6">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search projects, tasks, teammates..."
            className="w-full text-sm sm:text-base bg-transparent text-slate-900 placeholder-slate-400 outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Search Results Sections */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          {/* Projects */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-brand-600" />
              Projects ({filteredProjects.length})
            </div>
            {filteredProjects.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1">No matching projects found</p>
            ) : (
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelect('/app/projects')}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
                        {p.status}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tasks */}
          <div className="pt-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              Tasks ({filteredTasks.length})
            </div>
            {filteredTasks.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1">No matching tasks found</p>
            ) : (
              <div className="space-y-1">
                {filteredTasks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect('/app/tasks')}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="pr-3">
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-slate-400">in {t.projectName}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {t.status.replace('_', ' ')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Teammates */}
          <div className="pt-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-violetAccent-600" />
              Team Members ({filteredMembers.length})
            </div>
            {filteredMembers.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1">No matching teammates</p>
            ) : (
              <div className="space-y-1">
                {filteredMembers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelect('/app/teams')}
                    className="w-full p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-brand-600">
                          {m.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{m.role} • {m.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> to select
            </span>
          </div>
          <span>ProjX Global Quick Search</span>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalSearchModal;
