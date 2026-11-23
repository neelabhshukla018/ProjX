import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { UserPlus, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const InviteMemberModal = () => {
  const { isInviteModalOpen, setIsInviteModalOpen, inviteMember, activeWorkspace } = useWorkspace();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Contributor');
  const [department, setDepartment] = useState('Engineering');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const shareableLink = `https://projx.io/join/${activeWorkspace.id}?ref=invite_token_${Math.random().toString(36).substring(2, 9)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    toast.success('Invite link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid work email address');
      return;
    }

    inviteMember({ email: email.trim(), role, department, note });
    setEmail('');
    setNote('');
    setError('');
    setIsInviteModalOpen(false);
  };

  return (
    <Modal
      isOpen={isInviteModalOpen}
      onClose={() => setIsInviteModalOpen(false)}
      title="Invite Team Member"
      subtitle={`Add colleagues to collaborate within ${activeWorkspace.name}.`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSendInvite} className="space-y-4">
        <Input
          label="Work Email Address"
          type="email"
          placeholder="colleague@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Permission Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-sm rounded-lg py-2.5 px-3 bg-white border border-slate-200 outline-none focus:border-brand-500"
            >
              <option value="Admin">Admin (Full Control)</option>
              <option value="Lead">Lead (Project Management)</option>
              <option value="Contributor">Contributor (Read/Write)</option>
              <option value="Guest">Guest (Read Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-sm rounded-lg py-2.5 px-3 bg-white border border-slate-200 outline-none focus:border-brand-500"
            >
              <option value="Engineering">Engineering</option>
              <option value="Product & Design">Product & Design</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>

        {/* Shareable Invite Link Box */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Or share an instant invitation link</span>
            <span className="text-[10px] text-brand-600 font-normal">Expires in 7 days</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableLink}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-slate-500 font-mono outline-none"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={copied ? Check : Copy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsInviteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" leftIcon={UserPlus}>
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteMemberModal;
