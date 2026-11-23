import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { FolderPlus } from 'lucide-react';

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

    // Reset & close
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
            Summary / Scope <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Outline objectives, deliverables, and team impact..."
            className={`
              w-full text-sm rounded-lg p-3 bg-white border outline-none transition-colors
              ${errors.description ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'}
            `}
          />
          {errors.description && (
            <p className="text-xs text-rose-600 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-sm rounded-lg py-2.5 px-3 bg-white border border-slate-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Priority Tier
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-sm rounded-lg py-2.5 px-3 bg-white border border-slate-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            error={errors.dueDate}
            required
          />

          <Input
            label="Project Lead"
            value={formData.teamLead}
            onChange={(e) => setFormData({ ...formData, teamLead: e.target.value })}
            placeholder="Assign Lead"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsNewProjectModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" leftIcon={FolderPlus}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;
