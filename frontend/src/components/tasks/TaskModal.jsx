import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { CheckCircle2 } from 'lucide-react';

export const TaskModal = () => {
  const { isNewTaskModalOpen, setIsNewTaskModalOpen, addTask, projects, user } = useWorkspace();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: projects[0]?.id || '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    tags: 'Frontend',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Task title is required';
    }
    if (!formData.projectId) {
      errs.projectId = 'Please select an associated project';
    }
    if (!formData.dueDate) {
      errs.dueDate = 'Due date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedProj = projects.find((p) => p.id === formData.projectId);

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      projectId: formData.projectId,
      projectName: selectedProj ? selectedProj.name : 'General',
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      assignee: {
        name: user.name,
        avatar: user.avatar,
      },
    });

    setFormData({
      title: '',
      description: '',
      projectId: projects[0]?.id || '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      tags: 'Frontend',
    });
    setErrors({});
    setIsNewTaskModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNewTaskModalOpen}
      onClose={() => setIsNewTaskModalOpen(false)}
      title="Create New Task"
      subtitle="Assign actionable work with priorities and clear deliverables."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="e.g. Audit WCAG AA compliance across dark & light themes"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
            Associated Project <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            className={`
              w-full text-sm rounded-lg py-2.5 px-3 bg-white border outline-none
              ${errors.projectId ? 'border-rose-400' : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'}
            `}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="text-xs text-rose-600 mt-1">{errors.projectId}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
            Description
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Details, acceptance criteria, or links..."
            className="w-full text-sm rounded-lg p-3 bg-white border border-slate-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Status Column
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full text-sm rounded-lg py-2 px-2.5 bg-white border border-slate-200 outline-none"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-sm rounded-lg py-2 px-2.5 bg-white border border-slate-200 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            error={errors.dueDate}
            required
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          placeholder="Frontend, Accessibility, Urgent"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsNewTaskModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" leftIcon={CheckCircle2}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
