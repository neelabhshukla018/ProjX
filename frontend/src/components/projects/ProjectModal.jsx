import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Upload, FileText, Image as ImageIcon } from 'lucide-react';

export const ProjectModal = () => {
  const { isNewProjectModalOpen, setIsNewProjectModalOpen, addProject, user } = useWorkspace();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requiredSkills: '',
    requiredExperience: '1-2 years experience',
    requiredMembers: 3,
    startDate: new Date().toISOString().split('T')[0],
    deadline: '',
    status: 'Recruiting',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [docFiles, setDocFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses = ['Planning', 'Recruiting', 'In Progress', 'Completed'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Project name is required';
    } else if (formData.name.length < 3) {
      errs.name = 'Project name must be at least 3 characters';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide a project description';
    }
    if (!formData.deadline) {
      errs.deadline = 'Project deadline is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('description', formData.description.trim());
      data.append('requiredSkills', formData.requiredSkills);
      data.append('requiredExperience', formData.requiredExperience);
      data.append('requiredMembers', formData.requiredMembers);
      data.append('startDate', formData.startDate);
      data.append('deadline', formData.deadline);
      data.append('status', formData.status);

      if (photoFile) {
        data.append('photo', photoFile);
      }
      if (docFiles && docFiles.length > 0) {
        for (let i = 0; i < docFiles.length; i++) {
          data.append('documents', docFiles[i]);
        }
      }

      await addProject(data);

      setFormData({
        name: '',
        description: '',
        requiredSkills: '',
        requiredExperience: '1-2 years experience',
        requiredMembers: 3,
        startDate: new Date().toISOString().split('T')[0],
        deadline: '',
        status: 'Recruiting',
      });
      setPhotoFile(null);
      setDocFiles([]);
      setErrors({});
    } catch {
      // handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isNewProjectModalOpen}
      onClose={() => setIsNewProjectModalOpen(false)}
      title="Create New Project"
      subtitle="Publish a collaborative project, specify requirements, and recruit team members."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
        <Input
          label="Project Name"
          placeholder="e.g. Distributed Cloud Sync Engine"
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
            placeholder="Describe the initiative's objectives, architecture, and expected deliverables..."
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
          <Input
            label="Required Skills (comma separated)"
            placeholder="e.g. React, Node.js, MongoDB, Tailwind"
            value={formData.requiredSkills}
            onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
          />

          <Input
            label="Required Experience"
            placeholder="e.g. 1-2 years or Intermediate level"
            value={formData.requiredExperience}
            onChange={(e) => setFormData({ ...formData, requiredExperience: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Required Team Members"
            type="number"
            min="1"
            max="50"
            value={formData.requiredMembers}
            onChange={(e) => setFormData({ ...formData, requiredMembers: e.target.value })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Project Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Project Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />

          <Input
            label="Target Project Deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => {
              setFormData({ ...formData, deadline: e.target.value });
              if (errors.deadline) setErrors({ ...errors, deadline: null });
            }}
            error={errors.deadline}
            required
          />
        </div>

        {/* File Uploads: Project Photo & PDF Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Project Photo */}
          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Project Cover Photo (JPG/PNG/WEBP)
            </label>
            <div className="relative border border-dashed border-[#D8D8D8] rounded-lg p-3 hover:border-[#0F0F0F] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center gap-2 text-xs text-[#5A5A5A]">
                <ImageIcon className="w-4 h-4 text-[#0F0F0F] shrink-0" />
                <span className="truncate">
                  {photoFile ? photoFile.name : 'Choose cover image...'}
                </span>
              </div>
            </div>
          </div>

          {/* Project PDF Documents */}
          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Project Documents (PDF)
            </label>
            <div className="relative border border-dashed border-[#D8D8D8] rounded-lg p-3 hover:border-[#0F0F0F] transition-colors">
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => setDocFiles(Array.from(e.target.files || []))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center gap-2 text-xs text-[#5A5A5A]">
                <FileText className="w-4 h-4 text-[#0F0F0F] shrink-0" />
                <span className="truncate">
                  {docFiles.length > 0
                    ? `${docFiles.length} PDF file(s) selected`
                    : 'Attach project PDF specs...'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EFEFEF] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewProjectModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Publish Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;
