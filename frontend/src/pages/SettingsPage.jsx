import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useWorkspace } from '../hooks/useWorkspace';
import { Terminal, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { activeWorkspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState('general');

  const [workspaceName, setWorkspaceName] = useState(activeWorkspace.name);
  const [workspaceDomain, setWorkspaceDomain] = useState('acme.projx.io');
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:5000/api');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Workspace settings updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Configure organization settings, API connections, and team security policies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E5E5E5] pb-2">
        {[
          { id: 'general', label: 'General & Organization' },
          { id: 'api', label: 'API & Integrations' },
          { id: 'security', label: 'Security & Access' },
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
        <form onSubmit={handleSave} className="space-y-6">
          <Card title="Workspace Profile" subtitle="General organization metadata">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Workspace Name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                />
                <Input
                  label="Custom Domain Slug"
                  value={workspaceDomain}
                  onChange={(e) => setWorkspaceDomain(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
                  Subscription Plan
                </label>
                <div className="p-4 bg-[#0F0F0F] border border-[#2C2C2C] rounded-xl flex items-center justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FFFFFF]">Enterprise Scale Tier</span>
                      <Badge variant="dark" size="sm">Active</Badge>
                    </div>
                    <p className="text-xs text-[#B0B0B0] mt-0.5">
                      Unlimited projects, advanced Kanban, SOC-2 compliance, and dedicated support.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#FFFFFF] font-mono">Billed Annually</span>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button variant="primary" type="submit" leftIcon={Save}>
                  Save Workspace Info
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}

      {/* Tab 2: API & Integrations */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <Card
            title="Axios API Client Configuration"
            subtitle="Frontend foundation service endpoint for MERN backend connectivity"
            headerBorder
          >
            <div className="space-y-4">
              <div className="p-3 bg-[#0F0F0F] text-[#FFFFFF] rounded-xl font-mono text-xs border border-[#2C2C2C] overflow-x-auto">
                <div className="text-[#5A5A5A]">// src/services/api.js configuration:</div>
                <div>baseURL: "{apiBaseUrl}"</div>
                <div>timeout: 10000ms</div>
                <div>headers: Authorization: Bearer &lt;jwt_token&gt;</div>
              </div>

              <Input
                label="Backend Target Base URL (VITE_API_BASE_URL)"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                leftIcon={Terminal}
              />

              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => toast.success('API configuration saved')}>
                  Update API Endpoint
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Connected Third-Party Tools" subtitle="Active webhooks and sync providers">
            <div className="space-y-3">
              {[
                { name: 'GitHub Actions', desc: 'Sync PR statuses and deployment triggers', connected: true },
                { name: 'Figma Tokens', desc: 'Auto-sync design tokens with Apollo DS', connected: true },
                { name: 'Slack Workspaces', desc: 'Real-time task assignment alerts in #eng-sprints', connected: false },
              ].map((tool, i) => (
                <div
                  key={i}
                  className="p-3 border border-[#E5E5E5] rounded-xl flex items-center justify-between hover:bg-[#F5F5F5] transition-colors"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#0F0F0F]">{tool.name}</h5>
                    <p className="text-[11px] text-[#5A5A5A]">{tool.desc}</p>
                  </div>
                  {tool.connected ? (
                    <span className="text-xs font-semibold text-[#0F0F0F] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#2C2C2C]">
                      Connected
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toast.success(`Connected ${tool.name}`)}
                      className="text-xs font-semibold text-[#0F0F0F] bg-[#F5F5F5] px-2.5 py-1 rounded-md border border-[#D8D8D8] hover:bg-[#EAEAEA] transition-colors"
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Security & Access */}
      {activeTab === 'security' && (
        <Card title="Security & Compliance" subtitle="Audit retention and zero-trust policies">
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0F0F0F]">Enforce Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-[#5A5A5A]">Require hardware key or TOTP for all organization collaborators</p>
              </div>
              <span className="px-2 py-1 rounded bg-[#0F0F0F] text-[#FFFFFF] font-semibold text-[10px]">
                Enforced
              </span>
            </div>

            <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0F0F0F]">Audit Log Retention</p>
                <p className="text-[11px] text-[#5A5A5A]">Store tamper-evident audit records for 365 days</p>
              </div>
              <span className="px-2 py-1 rounded bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] font-semibold text-[10px]">
                Active (365d)
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
