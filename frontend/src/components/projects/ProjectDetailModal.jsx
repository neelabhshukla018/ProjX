import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import ProgressBar from '../common/ProgressBar';
import {
  Clock,
  Users,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Trash2,
  Edit3,
  Save,
  X,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/SocialIcons';
import { useWorkspace } from '../../hooks/useWorkspace';
import api, { API_ORIGIN } from '../../services/api';
import toast from 'react-hot-toast';

export const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const { user, applyToProject, updateApplicationStatus, deleteProject, updateProject } = useWorkspace();
  const [projectData, setProjectData] = useState(project);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplicantProfile, setSelectedApplicantProfile] = useState(null);

  // Edit Mode state for Project Manager
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    requiredSkills: '',
    requiredExperience: '',
    requiredMembers: 1,
    deadline: '',
  });

  const initEditData = (data = projectData) => {
    setEditFormData({
      name: data.name || '',
      description: data.description || '',
      status: data.status || 'Planning',
      requiredSkills: Array.isArray(data.requiredSkills) ? data.requiredSkills.join(', ') : data.requiredSkills || '',
      requiredExperience: data.requiredExperience || '',
      requiredMembers: data.requiredMembers || 1,
      deadline: data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : '',
    });
  };

  useEffect(() => {
    if (project && isOpen) {
      setProjectData(project);
      setIsEditing(false);
      initEditData(project);
      // Fetch fresh detail with applications from backend
      const fetchDetail = async () => {
        try {
          const res = await api.get(`/projects/${project._id || project.id}`);
          if (res.project) {
            setProjectData(res.project);
            initEditData(res.project);
          }
        } catch (err) {
          console.warn('Failed to fetch project details:', err.message);
        }
      };
      fetchDetail();
    }
  }, [project, isOpen]);

  const handleSaveProjectEdits = async (e) => {
    e.preventDefault();
    setIsSavingEdit(true);
    try {
      const skillsArray = editFormData.requiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const updated = await updateProject(projectData._id || projectData.id, {
        name: editFormData.name.trim(),
        description: editFormData.description.trim(),
        status: editFormData.status,
        requiredSkills: skillsArray,
        requiredExperience: editFormData.requiredExperience.trim(),
        requiredMembers: Number(editFormData.requiredMembers) || 1,
        deadline: editFormData.deadline,
      });

      setProjectData((prev) => ({
        ...prev,
        ...updated,
        name: editFormData.name.trim(),
        description: editFormData.description.trim(),
        status: editFormData.status,
        requiredSkills: skillsArray,
        requiredExperience: editFormData.requiredExperience.trim(),
        requiredMembers: Number(editFormData.requiredMembers) || 1,
        deadline: editFormData.deadline,
      }));
      setIsEditing(false);
    } catch {
      // handled in workspace context
    } finally {
      setIsSavingEdit(false);
    }
  };

  if (!projectData) return null;

  const isPMOwner =
    user?.role === 'project_manager' &&
    (projectData.owner?._id?.toString() === user._id?.toString() ||
      projectData.owner?.toString() === user._id?.toString());

  const isAcceptedMember = (projectData.members || []).some(
    (m) => (m._id || m).toString() === user?._id?.toString()
  );

  const handleApply = async () => {
    setIsLoading(true);
    try {
      await applyToProject(projectData._id || projectData.id);
      setProjectData((prev) => ({ ...prev, myApplicationStatus: 'Pending' }));
    } catch {
      // handled
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      // Update local applications list
      setProjectData((prev) => ({
        ...prev,
        applications: (prev.applications || []).map((a) =>
          a._id === appId ? { ...a, status: newStatus } : a
        ),
      }));
    } catch {
      // handled
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${projectData.name}"? This action cannot be undone.`)) {
      await deleteProject(projectData._id || projectData.id);
      onClose();
    }
  };

  const photoUrl = projectData.photo
    ? projectData.photo.startsWith('http')
      ? projectData.photo
      : `${API_ORIGIN}${projectData.photo}`
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={projectData.name}
      subtitle={`Initiative Status: ${projectData.status}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
        {isEditing ? (
          <form onSubmit={handleSaveProjectEdits} className="space-y-4">
            <div className="p-3 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">
                  Update Project Specifications
                </h4>
                <p className="text-[11px] text-[#5A5A5A]">
                  Edit your initiative details, required stack, team capacity, and milestone phase.
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0F0F0F] text-white">
                Project Manager
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                  Project Name <span className="text-[#0F0F0F] font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                  Description <span className="text-[#0F0F0F] font-bold">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Project Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Recruiting">Recruiting</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={editFormData.deadline}
                    onChange={(e) => setEditFormData({ ...editFormData, deadline: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={editFormData.requiredSkills}
                    onChange={(e) => setEditFormData({ ...editFormData, requiredSkills: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Required Team Members
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={editFormData.requiredMembers}
                    onChange={(e) => setEditFormData({ ...editFormData, requiredMembers: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                  Experience Requirement
                </label>
                <input
                  type="text"
                  placeholder="e.g. Intermediate or 1+ years experience"
                  value={editFormData.requiredExperience}
                  onChange={(e) => setEditFormData({ ...editFormData, requiredExperience: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-2.5 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EFEFEF]">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                leftIcon={Save}
                isLoading={isSavingEdit}
              >
                Save Project Changes
              </Button>
            </div>
          </form>
        ) : (
          <>
        {/* Cover Photo if uploaded (Responsive & Fully Seeable) */}
        {photoUrl && (
          <div className="w-full rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] shadow-xs overflow-hidden relative group">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 blur-xl scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${photoUrl})` }}
              aria-hidden="true"
            />
            <div className="relative z-10 w-full flex items-center justify-center p-3 min-h-[160px] max-h-[380px]">
              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cursor-zoom-in flex items-center justify-center max-w-full"
                title="Click to view full size photo"
              >
                <img
                  src={photoUrl}
                  alt={projectData.name}
                  className="max-w-full max-h-[360px] w-auto h-auto object-contain rounded-lg shadow-xs"
                />
              </a>
              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F0F0F]/85 hover:bg-[#0F0F0F] text-white text-[11px] font-medium backdrop-blur-xs transition-colors"
                title="Open full resolution photo in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Full Size</span>
              </a>
            </div>
          </div>
        )}

        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#F9F9F9] rounded-xl border border-[#EFEFEF] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0F0F0F]">Project Manager:</span>
            <span className="text-[#5A5A5A] font-medium">
              {projectData.owner?.fullName || 'Project Lead'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#5A5A5A]">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Deadline: {new Date(projectData.deadline || projectData.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5A5A5A]">
              <Users className="w-3.5 h-3.5" />
              <span>
                Required Members: {projectData.requiredMembers || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-2">
            Project Overview
          </h4>
          <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed whitespace-pre-line">
            {projectData.description}
          </p>
        </div>

        {/* Required Skills & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 border border-[#E5E5E5] rounded-xl bg-white">
            <span className="text-[11px] font-bold text-[#5A5A5A] uppercase tracking-wider block mb-2">
              Required Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(projectData.requiredSkills || []).length > 0 ? (
                projectData.requiredSkills.map((sk, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F0F0] text-[#0F0F0F] font-semibold"
                  >
                    {sk}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#888888]">Open to all technical stacks</span>
              )}
            </div>
          </div>

          <div className="p-3.5 border border-[#E5E5E5] rounded-xl bg-white">
            <span className="text-[11px] font-bold text-[#5A5A5A] uppercase tracking-wider block mb-2">
              Experience Requirement
            </span>
            <p className="text-xs text-[#0F0F0F] font-medium">
              {projectData.requiredExperience || 'Flexible / All experience levels welcome'}
            </p>
          </div>
        </div>

        {/* Project Progress */}
        <div className="p-3.5 border border-[#E5E5E5] rounded-xl bg-white">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#0F0F0F]">Progress Telemetry</span>
            <span className="font-bold text-[#0F0F0F]">{projectData.progress || 0}% Completed</span>
          </div>
          <ProgressBar value={projectData.progress || 0} color="black" size="sm" />
          <div className="flex items-center justify-between text-[11px] text-[#5A5A5A] mt-2">
            <span>Total Tasks: {projectData.totalTasks || 0}</span>
            <span>Completed: {projectData.completedTasks || 0}</span>
          </div>
        </div>

        {/* Documents (PDF) */}
        {projectData.documents && projectData.documents.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-2">
              Project Specification Documents (PDF)
            </h4>
            <div className="space-y-2">
              {projectData.documents.map((docPath, i) => {
                const fullDocUrl = docPath.startsWith('http')
                  ? docPath
                  : `${API_ORIGIN}${docPath}`;
                const filename = docPath.split('/').pop();
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-[#0F0F0F] shrink-0" />
                      <span className="truncate text-[#0F0F0F] font-medium">{filename}</span>
                    </div>
                    <a
                      href={fullDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F0F0F] text-white font-medium hover:bg-[#2C2C2C] transition-colors shrink-0"
                    >
                      <Download className="w-3 h-3" /> View / Download
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Accepted Team Members */}
        <div>
          <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-2">
            Accepted Project Team ({(projectData.members || []).length})
          </h4>
          {(projectData.members || []).length === 0 ? (
            <p className="text-xs text-[#5A5A5A] italic">No team members accepted yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectData.members.map((m, idx) => (
                <div
                  key={m._id || idx}
                  className="flex items-center gap-3 p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg"
                >
                  <Avatar
                    src={m.profilePhoto ? `${API_ORIGIN}${m.profilePhoto}` : ''}
                    name={m.fullName || 'Member'}
                    size="sm"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-[#0F0F0F] block truncate">
                      {m.fullName || 'Member'}
                    </span>
                    <span className="text-[10px] text-[#5A5A5A] block truncate">
                      {m.headline || m.skills?.join(', ') || 'Accepted Team Member'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Manager Applications Review Panel (for PM Owner) */}
        {isPMOwner && (
          <div className="pt-4 border-t border-[#E5E5E5]">
            <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Candidate Applications ({projectData.applications?.length || 0})</span>
              <span className="text-[10px] font-normal text-[#5A5A5A]">Review & Accept / Reject</span>
            </h4>

            {(!projectData.applications || projectData.applications.length === 0) ? (
              <p className="text-xs text-[#888888] italic p-4 bg-[#F9F9F9] rounded-lg text-center">
                No candidates have applied to this project yet.
              </p>
            ) : (
              <div className="space-y-3">
                {projectData.applications.map((app) => {
                  const applicant = app.applicant || {};
                  const resumeUrl = applicant.resume
                    ? applicant.resume.startsWith('http')
                      ? applicant.resume
                      : `${API_ORIGIN}${applicant.resume}`
                    : null;

                  return (
                    <div
                      key={app._id}
                      className="p-3.5 bg-white border border-[#E5E5E5] rounded-xl shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={applicant.profilePhoto ? `${API_ORIGIN}${applicant.profilePhoto}` : ''}
                            name={applicant.fullName || 'Applicant'}
                            size="md"
                          />
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-[#0F0F0F]">
                              {applicant.fullName}
                            </h5>
                            <p className="text-[11px] text-[#5A5A5A]">
                              {applicant.headline || applicant.email}
                            </p>
                            <span className="text-[10px] text-[#888888]">
                              Applied {new Date(app.appliedAt).toLocaleDateString()}
                            </span>
                            {(applicant.socialLinks?.github || applicant.socialLinks?.linkedin || applicant.socialLinks?.instagram) && (
                              <div className="flex items-center gap-1.5 mt-1">
                                {applicant.socialLinks.github && (
                                  <a
                                    href={applicant.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded bg-[#F5F5F5] hover:bg-[#0F0F0F] text-[#5A5A5A] hover:text-white transition-colors"
                                    title="GitHub"
                                  >
                                    <GithubIcon className="w-3 h-3" />
                                  </a>
                                )}
                                {applicant.socialLinks.linkedin && (
                                  <a
                                    href={applicant.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded bg-[#F5F5F5] hover:bg-[#0F0F0F] text-[#5A5A5A] hover:text-white transition-colors"
                                    title="LinkedIn"
                                  >
                                    <LinkedinIcon className="w-3 h-3" />
                                  </a>
                                )}
                                {applicant.socialLinks.instagram && (
                                  <a
                                    href={applicant.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded bg-[#F5F5F5] hover:bg-[#0F0F0F] text-[#5A5A5A] hover:text-white transition-colors"
                                    title="Instagram"
                                  >
                                    <InstagramIcon className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            app.status === 'Accepted'
                              ? 'bg-black text-white border-black'
                              : app.status === 'Rejected'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      {/* Bio & Skills */}
                      {applicant.bio && (
                        <p className="text-xs text-[#5A5A5A] italic">
                          "{applicant.bio}"
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {(applicant.skills || []).map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 bg-[#F0F0F0] text-[#0F0F0F] rounded font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons: Resume & Accept/Reject */}
                      <div className="pt-2 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
                        {resumeUrl ? (
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#0F0F0F] font-semibold hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View Resume (PDF)
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#888888]">No resume uploaded</span>
                        )}

                        <div className="flex items-center gap-2">
                          {app.status !== 'Accepted' && (
                            <Button
                              size="xs"
                              variant="primary"
                              leftIcon={CheckCircle}
                              onClick={() => handleStatusChange(app._id, 'Accepted')}
                            >
                              Accept
                            </Button>
                          )}
                          {app.status !== 'Rejected' && (
                            <Button
                              size="xs"
                              variant="secondary"
                              leftIcon={XCircle}
                              onClick={() => handleStatusChange(app._id, 'Rejected')}
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        </>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#EFEFEF] flex items-center justify-between">
          <div>
            {isPMOwner && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isEditing ? 'secondary' : 'primary'}
                  leftIcon={isEditing ? X : Edit3}
                  onClick={() => {
                    if (!isEditing) {
                      initEditData();
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Project'}
                </Button>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-semibold transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Project
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>

            {/* Team Member: Interested Button */}
            {user?.role === 'team_member' && (
              <>
                {isAcceptedMember ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F0F0F] text-white text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-white" /> Accepted Member
                  </span>
                ) : projectData.myApplicationStatus === 'Pending' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] border border-[#D8D8D8] text-[#5A5A5A] text-xs font-semibold">
                    Application Pending Review
                  </span>
                ) : projectData.myApplicationStatus === 'Rejected' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold">
                    Application Not Accepted
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    leftIcon={Sparkles}
                    isLoading={isLoading}
                    onClick={handleApply}
                  >
                    Interested / Apply
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
