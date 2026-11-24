import React, { useState, useEffect, useRef } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import Avatar from '../components/common/Avatar';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import {
  Save,
  Lock,
  Camera,
  FileText,
  Upload,
  Trash2,
  Download,
  ExternalLink,
  Globe,
  Link2,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_ORIGIN } from '../services/api';

export const ProfilePage = () => {
  const {
    user,
    updateProfile,
    uploadProfilePhoto,
    uploadResume,
    deleteResume,
    changePassword,
    stats,
  } = useWorkspace();

  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    headline: '',
    bio: '',
    skills: '',
    experience: '',
    education: '',
    instagram: '',
    github: '',
    linkedin: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || '',
        email: user.email || '',
        headline: user.headline || '',
        bio: user.bio || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || '',
        experience: user.experience || '',
        education: user.education || '',
        instagram: user.socialLinks?.instagram || '',
        github: user.socialLinks?.github || '',
        linkedin: user.socialLinks?.linkedin || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateProfile({
        fullName: formData.fullName,
        headline: formData.headline,
        bio: formData.bio,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        experience: formData.experience,
        education: formData.education,
        socialLinks: {
          instagram: formData.instagram,
          github: formData.github,
          linkedin: formData.linkedin,
        },
      });
    } catch {
      // handled
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      // handled
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    try {
      await uploadProfilePhoto(file);
    } catch {
      // handled
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleResumeSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF documents are allowed for resumes');
      return;
    }
    setIsUploadingResume(true);
    try {
      await uploadResume(file);
    } catch {
      // handled
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleDeleteResume = async () => {
    if (window.confirm('Are you sure you want to delete your resume?')) {
      await deleteResume();
    }
  };

  const avatarUrl = user.profilePhoto
    ? user.profilePhoto.startsWith('http')
      ? user.profilePhoto
      : `${API_ORIGIN}${user.profilePhoto}`
    : user.avatar || '';

  const resumeUrl = user.resume
    ? user.resume.startsWith('http')
      ? user.resume
      : `${API_ORIGIN}${user.resume}`
    : null;

  const roleName = user.role === 'project_manager' ? 'Project Manager' : 'Team Member';

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
          Account & Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Manage your personal credentials, professional portfolio, and platform role.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar src={avatarUrl} name={user.fullName || user.name} size="xl" status="online" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="absolute inset-0 bg-[#0F0F0F]/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              title="Change photo"
            >
              <Camera className="w-5 h-5 text-[#FFFFFF]" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#0F0F0F]">{user.fullName || user.name}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0F0F0F] text-white">
                {roleName}
              </span>
            </div>
            <p className="text-xs text-[#5A5A5A] mt-0.5">{user.headline || 'Professional Member'}</p>
            <p className="text-[11px] text-[#B0B0B0] mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-[#EFEFEF] pt-4 sm:pt-0 sm:pl-6 text-xs text-[#5A5A5A]">
          <div>
            <span className="block font-bold text-base text-[#0F0F0F]">{stats.totalProjects}</span>
            <span>{user.role === 'project_manager' ? 'Projects Led' : 'Active Projects'}</span>
          </div>
          <div>
            <span className="block font-bold text-base text-[#0F0F0F]">{stats.completedTasks}</span>
            <span>Tasks Completed</span>
          </div>
        </div>
      </div>

      {/* Main Profile Settings Form */}
      <Card title="Professional Profile" subtitle="Update your public portfolio details and contact links">
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <Input
              label="Email Address (Read-only)"
              type="email"
              value={formData.email}
              disabled
              className="bg-[#F5F5F5] cursor-not-allowed text-[#777777]"
            />
          </div>

          <Input
            label="Professional Headline"
            placeholder="e.g. Senior Full-Stack Engineer | React & Node.js Specialist"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              placeholder="Tell collaborators about your background, experience, and interests..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D8D8] p-3 text-[#0F0F0F] placeholder-[#B0B0B0] transition-colors outline-none hover:border-[#B0B0B0] focus:border-[#0F0F0F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Technical Skills (comma separated)"
              placeholder="e.g. JavaScript, React, Node.js, MongoDB, Git"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />

            <Input
              label="Experience Level / Summary"
              placeholder="e.g. 3 years frontend, 2 years backend development"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <Input
            label="Education"
            placeholder="e.g. B.Tech Computer Science & Engineering"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          />

          {/* Social Links */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-3">
              Social Media & Portfolio Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="GitHub URL"
                leftIcon={Globe}
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
              <Input
                label="LinkedIn URL"
                leftIcon={Link2}
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
              <Input
                label="Instagram URL"
                leftIcon={Share2}
                placeholder="https://instagram.com/username"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFEFEF] flex justify-end">
            <Button
              type="submit"
              variant="primary"
              leftIcon={Save}
              isLoading={isSavingProfile}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Resume Management Section (Important for Team Members) */}
      {user.role === 'team_member' && (
        <Card
          title="Professional Resume (PDF)"
          subtitle="Upload your resume so Project Managers can evaluate your credentials when you apply"
        >
          <div className="space-y-4">
            {resumeUrl ? (
              <div className="p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0F0F0F]">
                      Uploaded Resume Document
                    </h5>
                    <p className="text-[11px] text-[#5A5A5A]">
                      PDF document accessible to reviewing Project Managers
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#2C2C2C] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> View / Download
                  </a>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={handleDeleteResume}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-[#D8D8D8] rounded-xl text-center bg-[#FAFAFA]">
                <FileText className="w-10 h-10 text-[#888888] mx-auto mb-2" />
                <h5 className="text-sm font-bold text-[#0F0F0F]">No resume uploaded yet</h5>
                <p className="text-xs text-[#5A5A5A] mt-1 mb-4">
                  Upload your PDF resume to increase your chances of being accepted into projects.
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  leftIcon={Upload}
                  isLoading={isUploadingResume}
                  onClick={() => resumeInputRef.current?.click()}
                >
                  Upload Resume PDF
                </Button>
              </div>
            )}

            <input
              type="file"
              ref={resumeInputRef}
              accept="application/pdf"
              onChange={handleResumeSelect}
              className="hidden"
            />
          </div>
        </Card>
      )}

      {/* Security: Change Password Form */}
      <Card title="Security Credentials" subtitle="Update your account password">
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            leftIcon={Lock}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              leftIcon={Lock}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              leftIcon={Lock}
              required
            />
          </div>

          <div className="pt-4 border-t border-[#EFEFEF] flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              isLoading={isUpdatingPassword}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
