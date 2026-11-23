import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const InviteMemberModal = () => {
  const { isInviteModalOpen, setIsInviteModalOpen, inviteMember, activeWorkspace } = useWorkspace();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Contributor');
  const [department, setDepartment] = useState('Engineering');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const shareableLink = useMemo(() => {
    return `https://projx.io/join/${activeWorkspace.id}?ref=invite_token_sample`;
  }, [activeWorkspace.id]);

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
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Permission Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              <option value="Admin">Admin (Full Control)</option>
              <option value="Lead">Lead (Project Management)</option>
              <option value="Contributor">Contributor (Standard Access)</option>
              <option value="Viewer">Viewer (Read-Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
              Functional Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            >
              <option value="Engineering">Engineering</option>
              <option value="Product & Design">Product & Design</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Security">Security</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
            Personal Welcome Message (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Welcome to our workspace! Here's what we're working on..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D8D8] p-3 text-[#0F0F0F] placeholder-[#B0B0B0] outline-none hover:border-[#B0B0B0] focus:border-[#0F0F0F]"
          />
        </div>

        {/* Shareable Invite Link Box */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-[#5A5A5A] mb-1">
            Or share direct invite link
          </label>
          <div className="flex items-center gap-2 p-2 bg-[#F5F5F5] border border-[#D8D8D8] rounded-lg">
            <span className="text-[11px] text-[#5A5A5A] truncate flex-1 font-mono">
              {shareableLink}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1.5 text-xs font-semibold rounded bg-[#0F0F0F] text-white hover:bg-[#2C2C2C] flex items-center gap-1 transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EFEFEF] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsInviteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteMemberModal;
