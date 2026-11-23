import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

export const ProjectModal = () => {
  const { isNewProjectModalOpen, setIsNewProjectModalOpen, addProject, user } = useWorkspace();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Design System',
    priority: 'High',
    dueDate: '',
    teamLead: user.name,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Design System',
    'Infrastructure',
    'Mobile',
    'AI & ML',
    'Web App',
    'Security',
    'Marketing',
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Project name is required';
    } else if (formData.name.length < 3) {
      errs.name = 'Project name must be at least 3 characters';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief project summary';
    }
    if (!formData.dueDate) {
      errs.dueDate = 'Target completion deadline is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addProject({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate,
      teamLead: formData.teamLead,
      status: 'In Progress',
    });

    setFormData({
      name: '',
      description: '',
      category: 'Design System',
      priority: 'High',
      dueDate: '',
      teamLead: user.name,
    });
    setErrors({});
    setIsNewProjectModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNewProjectModalOpen}
      onClose={() => setIsNewProjectModalOpen(false)}
      title="Create New Project"
      subtitle="Kick off a high-impact initiative with structured milestones and team assignments."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Title"
          placeholder="e.g. Apollo Design System 2.0"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: null });
          }}
          error={errors.name}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
            Project Description <span className="text-[#0F0F0F] font-bold">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Briefly state the mission, deliverables, and strategic scope..."
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: null });
            }}
            className={`
              w-full rounded-lg text-xs sm:text-sm bg-[#FFFFFF] border p-3 text-[#0F0F0F] placeholder-[#B0B0B0]
              transition-colors duration-150 outline-none
              ${
                errors.description
                  ? 'border-[#2C2C2C] focus:border-[#0F0F0F]'
                  : 'border-[#D8D8D8] hover:border-[#B0B0B0] focus:border-[#0F0F0F]'
              }
            `}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-[#0F0F0F] font-medium">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Domain Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
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
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p} Priority
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Target Milestone Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => {
            setFormData({ ...formData, dueDate: e.target.value });
            if (errors.dueDate) setErrors({ ...errors, dueDate: null });
          }}
          error={errors.dueDate}
          required
        />

        <div className="pt-4 border-t border-[#EFEFEF] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewProjectModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;
