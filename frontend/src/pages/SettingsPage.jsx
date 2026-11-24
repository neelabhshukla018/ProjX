import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useWorkspace } from '../hooks/useWorkspace';
import { Terminal, Save, CheckCircle2, Shield, Database, Globe, LogOut, KeyRound } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const { user, activeWorkspace, logout } = useWorkspace();
  const [activeTab, setActiveTab] = useState('general');
  const [apiPingStatus, setApiPingStatus] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const navigate = useNavigate();

  const handleTestConnection = async () => {
    setIsPinging(true);
    try {
      const res = await api.get('/health');
      setApiPingStatus({
        ok: true,
        service: res.service || 'ProjX Backend API',
        timestamp: res.timestamp || new Date().toISOString(),
      });
      toast.success('Backend connection verified successfully!');
    } catch (err) {
      setApiPingStatus({
        ok: false,
        error: err.message || 'Connection failed',
      });
      toast.error('Could not reach backend API server');
    } finally {
      setIsPinging(false);
    }
  };

  const roleName = user?.role === 'project_manager' ? 'Project Manager' : 'Team Member';

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Configure platform integration, database telemetry, and authenticated session controls.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E5E5E5] pb-2">
        {[
          { id: 'general', label: 'Platform & Role Profile' },
          { id: 'api', label: 'API & Database Integration' },
          { id: 'security', label: 'Security & Session' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-[#0F0F0F] text-[#FFFFFF]'
                : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: General */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <Card title="Account Overview" subtitle="Authenticated user information and platform access tier">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Authenticated User
                  </label>
                  <p className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs font-bold text-[#0F0F0F]">
                    {user?.fullName || user?.name}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                    Account Email
                  </label>
                  <p className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs text-[#5A5A5A]">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
                  Assigned Platform Role
                </label>
                <div className="p-4 bg-[#0F0F0F] border border-[#2C2C2C] rounded-xl flex items-center justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FFFFFF]">{roleName}</span>
                      <span className="text-xs font-semibold text-emerald-400">• Verified Role</span>
                    </div>
                    <p className="text-xs text-[#B0B0B0] mt-0.5">
                      {user?.role === 'project_manager'
                        ? 'Full project lifecycle authority: project creation, applicant review, task delegation.'
                        : 'Collaborator privileges: browse initiatives, express interest, execute tasks, submit deliverables.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: API & Database */}
      {activeTab === 'api' && (
        <div className="space-y-4">
          <Card title="Backend & Database Connectivity" subtitle="Live service endpoints powering your ProjX workspace">
            <div className="space-y-4">
              <div className="p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#0F0F0F]" />
                    <span className="font-bold text-[#0F0F0F]">MongoDB Database</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black text-white font-semibold text-[10px]">
                    MongoDB Atlas Connected
                  </span>
                </div>
                <p className="text-[#5A5A5A]">
                  Cluster: <span className="font-mono text-[#0F0F0F]">projx-cluster.vqefor9.mongodb.net/projx</span>
                </p>
              </div>

              <div className="p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#0F0F0F]" />
                    <span className="font-bold text-[#0F0F0F]">REST API Service Base</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black text-white font-semibold text-[10px]">
                    Port 5000 Active
                  </span>
                </div>
                <p className="text-[#5A5A5A]">
                  Base URL: <span className="font-mono text-[#0F0F0F]">http://localhost:5000/api</span>
                </p>
              </div>

              {/* Ping Test Button */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  {apiPingStatus && (
                    <span className="text-xs font-semibold text-[#0F0F0F] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Status: {apiPingStatus.service} responding OK
                    </span>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isPinging}
                  onClick={handleTestConnection}
                >
                  Test API Ping
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Security & Session */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <Card title="Security & Authentication Standards" subtitle="Session tokens and authorization policies">
            <div className="space-y-4">
              <div className="p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#0F0F0F] font-bold">
                  <Shield className="w-4 h-4" />
                  <span>HTTP-Only Cookie JWT Architecture</span>
                </div>
                <p className="text-[#5A5A5A] leading-relaxed">
                  Your session authentication token is secured in an HTTP-only browser cookie (<code className="bg-[#EAEAEA] px-1 py-0.2 rounded">projx_token</code>). JavaScript running in the browser cannot tamper with or read the raw session credentials, protecting against XSS token harvesting.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={KeyRound}
                  onClick={() => navigate('/app/profile')}
                >
                  Change Password in Profile
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
                  leftIcon={LogOut}
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                >
                  Sign Out of ProjX
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
