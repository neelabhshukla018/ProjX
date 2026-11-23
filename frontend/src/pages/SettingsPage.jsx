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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure organization settings, API connections, and team security policies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
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
                ? 'bg-brand-50 text-brand-700 border border-brand-200/80'
                : 'text-slate-500 hover:text-slate-800'
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
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
                  Subscription Tier
                </label>
                <div className="p-4 bg-brand-50/50 border border-brand-200/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-brand-900">Enterprise Scale Tier</span>
                      <Badge variant="primary" size="sm">Active</Badge>
                    </div>
                    <p className="text-xs text-brand-700 mt-0.5">
                      Unlimited projects, advanced Kanban, SOC-2 compliance, and dedicated support.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-800 font-mono">Billed Annually</span>
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
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
                <div className="text-slate-500">// src/services/api.js configuration:</div>
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
                <Button variant="outline" onClick={() => toast.success('API configuration saved')}>
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
                  className="p-3 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{tool.name}</h5>
                    <p className="text-[11px] text-slate-500">{tool.desc}</p>
                  </div>
                  {tool.connected ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Connected
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toast.success(`Connected ${tool.name}`)}
                      className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200 hover:bg-brand-100 transition-colors"
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
        <Card title="Security & Authentication Policies" subtitle="Control organization sign-in rules">
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-bold text-slate-900">Enforce Multi-Factor Authentication (MFA)</p>
                <p className="text-[11px] text-slate-500">Require all workspace members to use TOTP / authenticator app</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-600" />
            </label>

            <label className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-bold text-slate-900">Single Sign-On (SAML / Okta)</p>
                <p className="text-[11px] text-slate-500">Allow members to authenticate via enterprise identity provider</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-600" />
            </label>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              <span className="font-bold">SOC-2 Session Timeout:</span> Inactive sessions are safely expired after 4 hours of inactivity.
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
