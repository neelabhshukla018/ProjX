import React, { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import Avatar from '../components/common/Avatar';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Save, Lock, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { user, updateProfile, stats } = useWorkspace();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    title: user.title,
    department: user.department,
    phone: user.phone,
    location: user.location,
    timezone: user.timezone,
    bio: user.bio,
    emailNotifications: user.preferences?.emailNotifications ?? true,
    taskAssignments: user.preferences?.taskAssignments ?? true,
    weeklyDigest: user.preferences?.weeklyDigest ?? true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      title: formData.title,
      department: formData.department,
      phone: formData.phone,
      location: formData.location,
      timezone: formData.timezone,
      bio: formData.bio,
      preferences: {
        emailNotifications: formData.emailNotifications,
        taskAssignments: formData.taskAssignments,
        weeklyDigest: formData.weeklyDigest,
      },
    });
  };

  const handlePasswordUpdate = (e) => {
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

    toast.success('Security password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleAvatarChange = () => {
    toast.success('Avatar upload prompt (mock): Avatar refreshed!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Account & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal credentials, role permissions, and notification subscriptions.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar src={user.avatar} name={user.name} size="xl" status="online" />
            <button
              type="button"
              onClick={handleAvatarChange}
              className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              title="Change avatar"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
              <Badge variant="primary" size="sm">
                {user.role}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">{user.title} • {user.department}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{user.location} • {user.timezone}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 text-xs text-slate-500">
          <div>
            <span className="block font-bold text-base text-slate-900">{stats.totalProjects}</span>
            <span>Projects Lead</span>
          </div>
          <div>
            <span className="block font-bold text-base text-slate-900">{stats.completedTasks}</span>
            <span>Tasks Closed</span>
          </div>
        </div>
      </div>

      {/* Main Profile Settings Form */}
      <Card title="Personal Information" subtitle="Update your public profile details">
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Work Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              label="Timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Professional Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-sm rounded-lg p-3 bg-white border border-slate-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" type="submit" leftIcon={Save}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Notification Preferences */}
      <Card title="Notification Preferences" subtitle="Control when and how you receive alerts">
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-slate-800">Task Assignments</p>
              <p className="text-[11px] text-slate-500">Receive alerts when teammates assign issues to you</p>
            </div>
            <input
              type="checkbox"
              checked={formData.taskAssignments}
              onChange={(e) =>
                setFormData({ ...formData, taskAssignments: e.target.checked })
              }
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-slate-800">Email Digest</p>
              <p className="text-[11px] text-slate-500">Weekly roundup of sprint velocity and upcoming deadlines</p>
            </div>
            <input
              type="checkbox"
              checked={formData.weeklyDigest}
              onChange={(e) =>
                setFormData({ ...formData, weeklyDigest: e.target.checked })
              }
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
          </label>
        </div>
      </Card>

      {/* Security Credentials */}
      <Card title="Security & Authentication" subtitle="Manage your account password">
        <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-lg">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
          />
          <Input
            label="New Password"
            type="password"
            placeholder="At least 6 characters"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
          />

          <Button variant="outline" type="submit" leftIcon={Lock}>
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
