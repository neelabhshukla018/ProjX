import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const TaskModal = () => {
  const { isNewTaskModalOpen, setIsNewTaskModalOpen, addTask, projects, user } = useWorkspace();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default project when opened
  useEffect(() => {
    if (projects.length > 0 && !formData.projectId) {
      setFormData((prev) => ({
        ...prev,
        projectId: projects[0]._id || projects[0].id,
      }));
    }
  }, [projects, formData.projectId]);

  const selectedProject = projects.find(
    (p) => (p._id || p.id) === formData.projectId
  );

  const acceptedMembers = selectedProject?.members || [];

  // Update default assignedTo when project changes
  useEffect(() => {
    if (acceptedMembers.length > 0) {
      setFormData((prev) => ({
        ...prev,
        assignedTo: acceptedMembers[0]._id || acceptedMembers[0].id || acceptedMembers[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, assignedTo: '' }));
    }
  }, [formData.projectId, selectedProject]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Task title is required';
    }
    if (!formData.projectId) {
      errs.projectId = 'Please select an associated project';
    }
    if (!formData.assignedTo) {
      errs.assignedTo = 'Select an accepted team member to assign';
    }
    if (!formData.dueDate) {
      errs.dueDate = 'Due date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        project: formData.projectId,
        assignedTo: formData.assignedTo,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate,
      });

      setFormData({
        title: '',
        description: '',
        projectId: projects[0]?._id || '',
        assignedTo: '',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '',
      });
      setErrors({});
    } catch {
      // handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isNewTaskModalOpen}
      onClose={() => setIsNewTaskModalOpen(false)}
      title="Create & Assign Task"
      subtitle="Define actionable deliverables for accepted members in your project."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="e.g. Implement user authentication endpoints"
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
            placeholder="Detailed instructions, acceptance criteria, or technical guidance..."
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
              {projects.length === 0 ? (
                <option value="">No projects created yet</option>
              ) : (
                projects.map((p) => (
                  <option key={p._id || p.id} value={p._id || p.id}>
                    {p.name}
                  </option>
                ))
              )}
            </select>
            {errors.projectId && (
              <p className="mt-1 text-xs text-[#0F0F0F] font-medium">{errors.projectId}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Assigned Team Member <span className="text-[#0F0F0F] font-bold">*</span>
            </label>
            <select
              value={formData.assignedTo}
              onChange={(e) => {
                setFormData({ ...formData, assignedTo: e.target.value });
                if (errors.assignedTo) setErrors({ ...errors, assignedTo: null });
              }}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              {acceptedMembers.length === 0 ? (
                <option value="">No accepted members in this project</option>
              ) : (
                acceptedMembers.map((m) => {
                  const mId = m._id || m.id || m;
                  const mName = m.fullName || m.name || 'Member';
                  return (
                    <option key={mId} value={mId}>
                      {mName}
                    </option>
                  );
                })
              )}
            </select>
            {acceptedMembers.length === 0 && (
              <p className="mt-1 text-[11px] text-[#888888]">
                Note: Accept an applicant first on the Projects page before assigning tasks.
              </p>
            )}
            {errors.assignedTo && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.assignedTo}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Priority Tier
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Task Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => {
              setFormData({ ...formData, dueDate: e.target.value });
              if (errors.dueDate) setErrors({ ...errors, dueDate: null });
            }}
            error={errors.dueDate}
            required
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
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={acceptedMembers.length === 0}
          >
            Assign Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
