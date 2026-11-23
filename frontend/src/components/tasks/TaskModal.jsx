import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

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
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: null });
          }}
          error={errors.title}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
            Task Description
          </label>
          <textarea
            rows={3}
            placeholder="Details, technical criteria, reproduction steps, or references..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D8D8] p-3 text-[#0F0F0F] placeholder-[#B0B0B0] transition-colors duration-150 outline-none hover:border-[#B0B0B0] focus:border-[#0F0F0F]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Associated Project <span className="text-[#0F0F0F] font-bold">*</span>
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Priority Tier
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => {
              setFormData({ ...formData, dueDate: e.target.value });
              if (errors.dueDate) setErrors({ ...errors, dueDate: null });
            }}
            error={errors.dueDate}
            required
          />

          <Input
            label="Tags (comma-separated)"
            placeholder="e.g. Design, Frontend, Accessibility"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t border-[#EFEFEF] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewTaskModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
