import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Sparkles,
  Layers,
  Trash2,
  Edit3,
  Save,
  X,
  Plus,
  Calendar,
  CheckSquare,
  Shield,
  FolderKanban,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/common/SocialIcons';
import { useWorkspace } from '../hooks/useWorkspace';
import Avatar from '../components/common/Avatar';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import api, { API_ORIGIN } from '../services/api';
import toast from 'react-hot-toast';

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    applyToProject,
    updateApplicationStatus,
    deleteProject,
    updateProject,
    setIsNewTaskModalOpen,
  } = useWorkspace();

  const [projectData, setProjectData] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

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

  const initEditData = (data) => {
    if (!data) return;
    setEditFormData({
      name: data.name || '',
      description: data.description || '',
      status: data.status || 'Planning',
      requiredSkills: Array.isArray(data.requiredSkills)
        ? data.requiredSkills.join(', ')
        : data.requiredSkills || '',
      requiredExperience: data.requiredExperience || '',
      requiredMembers: data.requiredMembers || 1,
      deadline: data.deadline
        ? new Date(data.deadline).toISOString().split('T')[0]
        : '',
    });
  };

  const fetchProjectDetails = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/projects/${id}`);
      if (res.project) {
        setProjectData(res.project);
        initEditData(res.project);
      }

      // Also fetch tasks for this project
      try {
        const taskRes = await api.get(`/tasks/project/${id}`);
        setProjectTasks(taskRes.tasks || []);
      } catch {
        setProjectTasks([]);
      }
    } catch (err) {
      toast.error('Failed to load project details');
      navigate('/app/projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0F0F0F] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-[#5A5A5A] font-medium">Loading project specifications...</span>
      </div>
    );
  }

  if (!projectData) return null;

  const isPMOwner =
    user?.role === 'project_manager' &&
    (projectData.owner?._id?.toString() === user._id?.toString() ||
      projectData.owner?.toString() === user._id?.toString());

  const isAcceptedMember = (projectData.members || []).some(
    (m) => (m._id || m).toString() === user?._id?.toString()
  );

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await applyToProject(projectData._id || projectData.id);
      setProjectData((prev) => ({ ...prev, myApplicationStatus: 'Pending' }));
    } catch {
      // handled
    } finally {
      setIsApplying(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      setProjectData((prev) => ({
        ...prev,
        applications: (prev.applications || []).map((a) =>
          a._id === appId ? { ...a, status: newStatus } : a
        ),
      }));
      // refresh project data to update accepted members
      await fetchProjectDetails();
    } catch {
      // handled
    }
  };

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
      toast.success('Project details saved!');
    } catch {
      // handled
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${projectData.name}"? This action cannot be undone.`
      )
    ) {
      await deleteProject(projectData._id || projectData.id);
      navigate('/app/projects');
    }
  };

  const photoUrl = projectData.photo
    ? projectData.photo.startsWith('http')
      ? projectData.photo
      : `${API_ORIGIN}${projectData.photo}`
    : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E5E5]">
        <Link
          to="/app/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A5A5A] hover:text-[#0F0F0F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects Hub
        </Link>

        <div className="flex items-center gap-2">
          {/* PM Owner Actions */}
          {isPMOwner && (
            <>
              <Button
                size="sm"
                variant={isEditing ? 'secondary' : 'primary'}
                leftIcon={isEditing ? X : Edit3}
                onClick={() => {
                  if (!isEditing) {
                    initEditData(projectData);
                  }
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Project'}
              </Button>

              <Button
                size="sm"
                variant="secondary"
                leftIcon={Plus}
                onClick={() => setIsNewTaskModalOpen(true)}
              >
                Create Task
              </Button>

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg font-semibold transition-colors ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Project
                </button>
              )}
            </>
          )}

          {/* Team Member Interested / Application Status */}
          {user?.role === 'team_member' && (
            <div>
              {isAcceptedMember ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F0F0F] text-white text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-white" /> Accepted Project Member
                </span>
              ) : projectData.myApplicationStatus === 'Pending' ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] border border-[#D8D8D8] text-[#5A5A5A] text-xs font-semibold">
                  Application Pending Review
                </span>
              ) : projectData.myApplicationStatus === 'Rejected' ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold">
                  Application Not Accepted
                </span>
              ) : (
                <Button
                  variant="primary"
                  leftIcon={Sparkles}
                  isLoading={isApplying}
                  onClick={handleApply}
                >
                  Interested / Apply to Join
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Edit Mode vs Full Detail Page */}
      {isEditing ? (
        <Card title="Edit Project Specifications" subtitle="Update roadmap milestone phase, capacity, and requirements">
          <form onSubmit={handleSaveProjectEdits} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                Project Name <span className="text-[#0F0F0F] font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                Description <span className="text-[#0F0F0F] font-bold">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                  Project Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                >
                  <option value="Planning">Planning</option>
                  <option value="Recruiting">Recruiting</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                  Target Deadline
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.deadline}
                  onChange={(e) => setEditFormData({ ...editFormData, deadline: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={editFormData.requiredSkills}
                  onChange={(e) => setEditFormData({ ...editFormData, requiredSkills: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                  Required Team Members
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={editFormData.requiredMembers}
                  onChange={(e) => setEditFormData({ ...editFormData, requiredMembers: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5">
                Experience Requirement
              </label>
              <input
                type="text"
                placeholder="e.g. Intermediate or 1+ years experience"
                value={editFormData.requiredExperience}
                onChange={(e) => setEditFormData({ ...editFormData, requiredExperience: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-lg p-3 bg-white border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#EFEFEF]">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" leftIcon={Save} isLoading={isSavingEdit}>
                Save Project Changes
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <>
          {/* Cover Photo Showcase (Fully responsive, uncropped & full size viewable) */}
          {photoUrl && (
            <div className="w-full rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] shadow-card overflow-hidden relative group">
              {/* Ambient backdrop blur using the photo */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-125 pointer-events-none"
                style={{ backgroundImage: `url(${photoUrl})` }}
                aria-hidden="true"
              />
              <div className="relative z-10 w-full flex items-center justify-center p-3 sm:p-5 md:p-6 min-h-[200px] max-h-[540px]">
                <a
                  href={photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-zoom-in flex items-center justify-center max-w-full"
                  title="Click to view full size image"
                >
                  <img
                    src={photoUrl}
                    alt={projectData.name}
                    className="max-w-full max-h-[500px] w-auto h-auto object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </a>
                <a
                  href={photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F]/85 hover:bg-[#0F0F0F] text-white text-xs font-semibold backdrop-blur-xs transition-colors shadow-subtle"
                  title="Open full resolution photo in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Full Size View</span>
                </a>
              </div>
            </div>
          )}

          {/* Project Title & Status Hero */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0F0F0F] text-white">
                  {projectData.status}
                </span>
                <span className="text-xs font-semibold text-[#5A5A5A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Due {new Date(projectData.deadline).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F0F0F] tracking-tight">
                {projectData.name}
              </h1>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#EFEFEF] pt-4 md:pt-0 md:pl-8 text-xs text-[#5A5A5A]">
              <div>
                <span className="block font-bold text-xl sm:text-2xl text-[#0F0F0F]">
                  {projectData.progress || 0}%
                </span>
                <span>Milestone Progress</span>
              </div>
              <div>
                <span className="block font-bold text-xl sm:text-2xl text-[#0F0F0F]">
                  {(projectData.members || []).length} / {projectData.requiredMembers || 1}
                </span>
                <span>Team Members</span>
              </div>
              <div>
                <span className="block font-bold text-xl sm:text-2xl text-[#0F0F0F]">
                  {projectTasks.length}
                </span>
                <span>Total Tasks</span>
              </div>
            </div>
          </div>

          {/* 2-Column Responsive Body Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Overview, Tasks, Applications */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detailed Overview */}
              <Card title="Initiative Overview" subtitle="Detailed scope, objectives, and acceptance guidelines">
                <div className="text-xs sm:text-sm text-[#2C2C2C] leading-relaxed whitespace-pre-line">
                  {projectData.description}
                </div>
              </Card>

              {/* Tasks for this Project */}
              <Card
                title={`Project Tasks & Deliverables (${projectTasks.length})`}
                subtitle="Work packages and assignees executing this initiative"
                action={
                  isPMOwner && (
                    <Button
                      size="sm"
                      variant="secondary"
                      leftIcon={Plus}
                      onClick={() => setIsNewTaskModalOpen(true)}
                    >
                      New Task
                    </Button>
                  )
                }
              >
                {projectTasks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#888888] italic border border-dashed border-[#D8D8D8] rounded-xl">
                    No tasks assigned to this project yet.
                  </div>
                ) : (
                  <div className="divide-y divide-[#EFEFEF]">
                    {projectTasks.map((task) => (
                      <div
                        key={task._id || task.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F9F9F9] px-2 rounded-lg transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F] truncate">
                              {task.title}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-white border-[#D8D8D8]">
                              {task.priority || 'Medium'}
                            </span>
                          </div>
                          {task.description && (
                            <p className="text-[11px] text-[#5A5A5A] truncate">{task.description}</p>
                          )}
                          {task.progressUpdate && (
                            <p className="text-[10px] text-[#0F0F0F] font-medium mt-1">
                              Update: {task.progressUpdate}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              task.status === 'Completed'
                                ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                                : task.status === 'In Review'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : task.status === 'In Progress'
                                ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]'
                                : 'bg-[#F0F0F0] text-[#0F0F0F] border-[#D8D8D8]'
                            }`}
                          >
                            {task.status || 'To Do'}
                          </span>

                          <div className="flex items-center gap-1.5 text-xs text-[#5A5A5A]">
                            <Avatar
                              src={
                                task.assignedTo?.profilePhoto
                                  ? `${API_ORIGIN}${task.assignedTo.profilePhoto}`
                                  : ''
                              }
                              name={task.assignedTo?.fullName || 'Assignee'}
                              size="xs"
                            />
                            <span className="text-[11px] truncate max-w-[100px]">
                              {task.assignedTo?.fullName || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Candidate Applications Review Panel (PM Owner Only) */}
              {isPMOwner && (
                <Card
                  title={`Candidate Applications (${projectData.applications?.length || 0})`}
                  subtitle="Review applicant profiles, credentials, resumes, and accept or reject candidates"
                >
                  {(!projectData.applications || projectData.applications.length === 0) ? (
                    <p className="text-xs text-[#888888] italic p-6 bg-[#F9F9F9] rounded-xl text-center">
                      No candidate applications submitted for this project yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
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
                            className="p-4 bg-white border border-[#E5E5E5] rounded-xl shadow-xs space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={applicant.profilePhoto ? `${API_ORIGIN}${applicant.profilePhoto}` : ''}
                                  name={applicant.fullName || 'Applicant'}
                                  size="md"
                                />
                                <div>
                                  <h5 className="text-sm font-bold text-[#0F0F0F]">
                                    {applicant.fullName}
                                  </h5>
                                  <p className="text-xs text-[#5A5A5A]">
                                    {applicant.headline || applicant.email}
                                  </p>
                                  <span className="text-[10px] text-[#888888] block mt-0.5">
                                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                                  </span>

                                  {/* Social links */}
                                  {(applicant.socialLinks?.github ||
                                    applicant.socialLinks?.linkedin ||
                                    applicant.socialLinks?.instagram) && (
                                    <div className="flex items-center gap-1.5 mt-1.5">
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

                              <span
                                className={`text-[10px] font-bold px-2.5 py-1 rounded border ${
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

                            {applicant.bio && (
                              <p className="text-xs text-[#5A5A5A] italic bg-[#F9F9F9] p-2.5 rounded-lg">
                                "{applicant.bio}"
                              </p>
                            )}

                            {/* Skills */}
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

                            {/* Actions & Resume */}
                            <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
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
                </Card>
              )}
            </div>

            {/* Right 1 Col: Progress Telemetry, PM Card, Requirements, Documents */}
            <div className="space-y-6">
              {/* Progress Telemetry */}
              <Card title="Progress Telemetry" subtitle="Real-time milestone progress tracking">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5A5A5A]">Milestone Completion</span>
                    <span className="font-bold text-[#0F0F0F]">{projectData.progress || 0}%</span>
                  </div>
                  <ProgressBar value={projectData.progress || 0} color="black" size="md" />

                  <div className="pt-2 border-t border-[#EFEFEF] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[11px] text-[#888888] block">Total Tasks</span>
                      <span className="font-bold text-[#0F0F0F]">{projectTasks.length}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#888888] block">Completed Tasks</span>
                      <span className="font-bold text-[#0F0F0F]">
                        {projectTasks.filter((t) => t.status === 'Completed').length}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Project Manager Card */}
              <Card title="Project Manager" subtitle="Initiative creator and sprint lead">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={
                      projectData.owner?.profilePhoto
                        ? `${API_ORIGIN}${projectData.owner.profilePhoto}`
                        : ''
                    }
                    name={projectData.owner?.fullName || 'Lead'}
                    size="md"
                  />
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-[#0F0F0F] truncate">
                      {projectData.owner?.fullName || 'Project Lead'}
                    </h5>
                    <p className="text-xs text-[#5A5A5A] truncate">
                      {projectData.owner?.headline || 'Project Lead'}
                    </p>
                    <p className="text-[11px] text-[#888888] truncate mt-0.5">
                      {projectData.owner?.email}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Technical Requirements */}
              <Card title="Technical Specifications" subtitle="Skill set and experience requirements">
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#5A5A5A] uppercase tracking-wider block mb-1.5">
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
                        <span className="text-xs text-[#888888]">Open to all stacks</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EFEFEF]">
                    <span className="text-[11px] font-bold text-[#5A5A5A] uppercase tracking-wider block mb-1">
                      Experience Requirement
                    </span>
                    <p className="text-xs text-[#0F0F0F] font-medium">
                      {projectData.requiredExperience || 'All experience levels welcome'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Accepted Members Roster */}
              <Card
                title={`Accepted Members (${(projectData.members || []).length}/${projectData.requiredMembers || 1})`}
                subtitle="Collaborators active in project roster"
              >
                {(projectData.members || []).length === 0 ? (
                  <p className="text-xs text-[#888888] italic py-2">No team members joined yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {(projectData.members || []).map((m) => (
                      <div
                        key={m._id || m.id}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F9F9F9] border border-[#EFEFEF]"
                      >
                        <Avatar
                          src={m.profilePhoto ? `${API_ORIGIN}${m.profilePhoto}` : ''}
                          name={m.fullName || 'Member'}
                          size="xs"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-[#0F0F0F] block truncate">
                            {m.fullName}
                          </span>
                          <span className="text-[10px] text-[#5A5A5A] block truncate">
                            {m.headline || m.email}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* PDF Documents */}
              {projectData.documents && projectData.documents.length > 0 && (
                <Card title="Project Documents (PDF)" subtitle="Official technical attachments">
                  <div className="space-y-2">
                    {projectData.documents.map((doc, idx) => {
                      const docUrl = doc.startsWith('http') ? doc : `${API_ORIGIN}${doc}`;
                      const fileName = doc.split('/').pop();
                      return (
                        <a
                          key={idx}
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 bg-[#F9F9F9] hover:bg-[#F0F0F0] border border-[#E5E5E5] rounded-lg transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <FileText className="w-4 h-4 text-[#0F0F0F] shrink-0" />
                            <span className="font-medium text-[#0F0F0F] truncate">{fileName}</span>
                          </div>
                          <Download className="w-3.5 h-3.5 text-[#5A5A5A] shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailPage;
