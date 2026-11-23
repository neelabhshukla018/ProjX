import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Kanban,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  ChevronRight,
  Play,
  Check,
} from 'lucide-react';
import Button from '../components/common/Button';
import { heroEntrance } from '../utils/animations';

export const LandingPage = () => {
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState('kanban');

  useEffect(() => {
    if (heroRef.current) {
      heroEntrance(heroRef.current);
    }
  }, []);

  const features = [
    {
      icon: Kanban,
      title: 'Real-Time Kanban & Sprints',
      description:
        'Fluid drag-and-drop workflows with customizable status pipelines, subtask tracking, and velocity counters.',
      tag: 'Core Engine',
    },
    {
      icon: BarChart3,
      title: 'Predictive Velocity Analytics',
      description:
        'Interactive Recharts telemetry for cycle times, throughput trends, and automated sprint milestone forecasting.',
      tag: 'Intelligence',
    },
    {
      icon: Users,
      title: 'Unified Team Orchestration',
      description:
        'Role-based permissions, department clusters, workload balancing, and instant cross-functional invite links.',
      tag: 'Collaboration',
    },
    {
      icon: Zap,
      title: 'Contextual AI Companion',
      description:
        'Automated task summarization, PR descriptions, and smart deadline risk detection powered by Gemini intelligence.',
      tag: 'Automation',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise-Grade Security',
      description:
        'Built with SOC-2 compliance principles, granular access control, audit logs, and end-to-end data safety.',
      tag: 'Compliance',
    },
    {
      icon: Clock,
      title: 'Zero-Latency Global Search',
      description:
        'Lightning-fast keyboard shortcut navigation (Ctrl+K) across all your projects, tasks, comments, and members.',
      tag: 'Productivity',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Plan & Blueprint',
      desc: 'Define quarterly milestones, allocate team capacity, and set target deliverables.',
    },
    {
      step: '02',
      title: 'Execute with Precision',
      desc: 'Distribute granular tasks on interactive boards with clear priority indicators.',
    },
    {
      step: '03',
      title: 'Measure Throughput',
      desc: 'Track live burn-down rates and sprint velocity with beautiful visual charts.',
    },
    {
      step: '04',
      title: 'Deliver on Schedule',
      desc: 'Consistently hit target dates with automated deadline alerts and zero bottlenecks.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              Proj<span className="text-brand-600">X</span>
            </span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-brand-600 transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-brand-600 transition-colors">
              Product Tour
            </a>
            <a href="#workflow" className="hover:text-brand-600 transition-colors">
              Workflow
            </a>
            <a href="#security" className="hover:text-brand-600 transition-colors">
              Enterprise
            </a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link to="/app">
              <Button size="sm" variant="primary" rightIcon={ArrowRight}>
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-200/40 to-violetAccent-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div ref={heroRef} className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold mb-6 shadow-subtle animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>ProjX 2.0 is now live</span>
            <span className="text-slate-300">•</span>
            <span className="text-brand-600 flex items-center font-bold">
              Explore Platform <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] mb-6">
            Where high-velocity teams turn{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 bg-clip-text text-transparent">
              chaos into cohesion.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            The next-generation project collaboration platform designed for modern engineering, product, and design organizations. Plan, execute, and deliver without friction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link to="/app" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" rightIcon={ArrowRight} className="w-full sm:w-auto shadow-md">
                Launch Workspace Demo
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>

          {/* Trust proof indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> SOC-2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 99.99% Uptime SLA
            </span>
          </div>
        </div>

        {/* Interactive Product Preview Mockup */}
        <div id="preview" className="max-w-6xl mx-auto mt-14">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-elevated p-2 sm:p-4 transition-all">
            {/* Mock Window Header */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-semibold text-slate-500 hidden sm:inline">
                  app.projx.io/workspace/apollo-design-system
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab('kanban')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'kanban' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Kanban Board
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'analytics' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Throughput Metrics
                </button>
              </div>
            </div>

            {/* Mock Dashboard Preview Content */}
            {activeTab === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 bg-slate-50/50 rounded-xl">
                {/* Col 1 */}
                <div className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200/70">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" /> To Do
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-slate-200">2</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded uppercase">Frontend</span>
                      <p className="text-xs font-semibold text-slate-800 mt-1">Audit WCAG AA compliance across dark & light themes</p>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                        <span>2/3 subtasks</span>
                        <span className="text-amber-600 font-semibold">3d left</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">DevOps</span>
                      <p className="text-xs font-semibold text-slate-800 mt-1">Setup automated penetration test matrix for API gateway</p>
                    </div>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-500" /> In Progress
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-indigo-200">3</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="bg-white p-3 rounded-lg border border-brand-200 shadow-xs">
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded uppercase">Design</span>
                      <p className="text-xs font-semibold text-slate-800 mt-1">Implement optimistic UI state for Kanban drag-and-drop</p>
                      <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
                        <div className="bg-brand-600 h-full w-3/4 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded uppercase">AI Stream</span>
                      <p className="text-xs font-semibold text-slate-800 mt-1">Fine-tune streaming token responses in LLM chat UI</p>
                    </div>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Done
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-emerald-200">5</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">Mobile</span>
                      <p className="text-xs font-semibold text-slate-800 line-through mt-1">Integrate biometrics FaceID / TouchID auth prompt</p>
                      <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">✓ Verified in QA</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-50/50 rounded-xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-3">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-slate-900 mb-1">94.2% On-Time Delivery Velocity</h4>
                <p className="text-xs text-slate-500 max-w-md mb-4">
                  ProjX automatically aggregates lead times, cycle durations, and blocker resolution speeds into real-time visual telemetry.
                </p>
                <Link to="/app/analytics">
                  <Button size="sm" variant="primary">
                    View Live Analytics Engine
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2 block">
            Capabilities Engineered for Scale
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Everything your team needs to stay in sync
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Replace fragmented spreadsheets, disconnected task trackers, and stale documentation with a cohesive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle hover:shadow-card hover:border-brand-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration Workflow Section */}
      <section id="workflow" className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2 block">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              From roadmap conception to production shipping
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-brand-400 mb-4 block font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white shadow-elevated relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Ready to modernize your team's project velocity?
            </h2>
            <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto mb-8 font-normal">
              Experience the unified workspace designed for high-performance engineering, product, and design organizations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/app" className="w-full sm:w-auto">
                <Button size="lg" variant="dark" rightIcon={ArrowRight} className="w-full sm:w-auto">
                  Launch Live Workspace
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
                >
                  Sign Up for Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">ProjX Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link to="/app" className="hover:text-brand-600 transition-colors">
              App Dashboard
            </Link>
            <Link to="/login" className="hover:text-brand-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-brand-600 transition-colors">
              Register
            </Link>
            <a href="#features" className="hover:text-brand-600 transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-brand-600 transition-colors">
              Workflow
            </a>
          </div>

          <p>© {new Date().getFullYear()} ProjX Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
