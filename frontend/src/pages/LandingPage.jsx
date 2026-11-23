import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Kanban,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  Clock,
} from 'lucide-react';
import Button from '../components/common/Button';
import FlipText from '../components/common/FlipText';
import SquigglyText from '../components/common/SquigglyText';
import ContainerScroll from '../components/common/ContainerScroll';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
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
      title: 'Precision Kanban & Sprints',
      description:
        'Fluid state pipelines with customizable velocity counters, subtask checklists, and instant status synchronizations.',
      tag: 'Core Engine',
    },
    {
      icon: BarChart3,
      title: 'Predictive Velocity Telemetry',
      description:
        'Interactive Recharts telemetry for cycle times, sprint throughput trends, and automated milestone forecasting.',
      tag: 'Intelligence',
    },
    {
      icon: Users,
      title: 'Cross-Functional Orchestration',
      description:
        'Granular team directories, department clusters, workload balancing, and seamless 1-click collaboration links.',
      tag: 'Collaboration',
    },
    {
      icon: Zap,
      title: 'Contextual AI Companion',
      description:
        'Intelligent task breakdown, automated PR context summarization, and deadline risk detection powered by AI.',
      tag: 'Automation',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security Architecture',
      description:
        'Engineered around SOC-2 compliance principles, audit trails, end-to-end data safety, and zero-trust credentials.',
      tag: 'Security',
    },
    {
      icon: Clock,
      title: 'Zero-Latency Global Navigation',
      description:
        'Instant keyboard shortcut lookup (Ctrl+K / ⌘K) across all workspace initiatives, actionable tickets, and colleagues.',
      tag: 'Velocity',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Architect & Blueprint',
      desc: 'Define quarterly milestones, allocate team capacity, and establish deliverables in unified workspaces.',
    },
    {
      step: '02',
      title: 'Execute with Precision',
      desc: 'Distribute granular issues across interactive Kanban boards with strict priority indicators and subtasks.',
    },
    {
      step: '03',
      title: 'Monitor Velocity',
      desc: 'Track throughput and cycle duration with monochrome Recharts analytics and automated alerts.',
    },
    {
      step: '04',
      title: 'Deliver on Schedule',
      desc: 'Consistently hit milestone dates with zero bottlenecks, full audit histories, and seamless retrospectives.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#0F0F0F] selection:bg-[#0F0F0F] selection:text-[#FFFFFF]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-sm relative">
              <Layers className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-[#0F0F0F] tracking-tight">
              Proj<span className="text-[#0F0F0F]">X</span>
            </span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-[#5A5A5A]">
            <a href="#features" className="hover:text-[#0F0F0F] transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-[#0F0F0F] transition-colors">
              Product Tour
            </a>
            <a href="#workflow" className="hover:text-[#0F0F0F] transition-colors">
              Methodology
            </a>
            <a href="#security" className="hover:text-[#0F0F0F] transition-colors">
              Enterprise
            </a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-[#2C2C2C] hover:text-[#0F0F0F] px-3 py-2 rounded-lg transition-colors"
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
        <div ref={heroRef} className="max-w-4xl mx-auto text-center">
          {/* Main Headline with Aceternity SquigglyText & Vengeance UI FlipText Animation */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F0F0F] tracking-tight leading-[1.08] mb-6">
            <SquigglyText scale={[2.5, 4.5]} stepDuration={90}>
              The monochrome standard for
            </SquigglyText>{' '}
            <FlipText
              words={[
                'high-velocity teams.',
                'engineering ateliers.',
                'product architects.',
              ]}
              duration={2.5}
              className="inline-block text-[#0093A5]"
            />
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-[#5A5A5A] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            The unified project collaboration and team orchestration platform engineered for high-precision product architects, engineers, and digital ateliers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link to="/app" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" rightIcon={ArrowRight} className="w-full sm:w-auto shadow-md">
                Launch Live Dashboard
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>

          {/* Trust proof indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#5A5A5A] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" /> SOC-2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" /> 99.99% Uptime SLA
            </span>
          </div>
        </div>

        {/* Product Preview Mockup with 3D Container Scroll Animation */}
        <div id="preview" className="max-w-6xl mx-auto mt-10 sm:mt-16">
          <ContainerScroll maxTilt={20}>
            {/* Mock Window Header */}
            <div className="flex items-center justify-between pb-3 px-3 sm:px-4 pt-3 border-b border-[#EFEFEF] bg-[#FFFFFF]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-xs" />
                <span className="ml-3 text-xs font-semibold text-[#5A5A5A] hidden sm:inline">
                  app.projx.io/workspace/apollo-design-system
                </span>
              </div>

              {/* Real-time Workspace Sync & View Switcher */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] text-[10px] font-medium text-[#5A5A5A]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C93F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#27C93F]" />
                  </span>
                  <span>Live Sync</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#F5F5F5] p-1 rounded-lg border border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('kanban')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      activeTab === 'kanban'
                        ? 'bg-[#0F0F0F] text-[#FFFFFF] shadow-xs'
                        : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
                    }`}
                  >
                    Kanban Board
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      activeTab === 'analytics'
                        ? 'bg-[#0F0F0F] text-[#FFFFFF] shadow-xs'
                        : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
                    }`}
                  >
                    Throughput Metrics
                  </button>
                </div>
              </div>
            </div>

            {/* Mock Dashboard Preview Content */}
            <div className="p-3 sm:p-5 bg-[#FAFAFA]">
              {activeTab === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Col 1 - To Do */}
                  <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E5E5E5] shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F0F0F] mb-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#B0B0B0]" /> To Do
                      </span>
                      <span className="text-xs text-[#5A5A5A] font-semibold">2 tasks</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">Frontend</span>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5">
                          Audit WCAG AA compliance across dark & light themes
                        </p>
                        <div className="flex items-center justify-between mt-2.5 text-[10px] text-[#5A5A5A]">
                          <span>2/3 subtasks</span>
                          <span className="text-[#0F0F0F] font-bold">3d left</span>
                        </div>
                      </div>
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">DevOps</span>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5">
                          Setup automated penetration test matrix for API gateway
                        </p>
                        <div className="flex items-center justify-between mt-2.5 text-[10px] text-[#5A5A5A]">
                          <span>0/4 subtasks</span>
                          <span className="text-[#5A5A5A]">5d left</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 2 - In Progress */}
                  <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E5E5E5] shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F0F0F] mb-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0F0F0F]" /> In Progress
                      </span>
                      <span className="text-xs text-[#5A5A5A] font-semibold">3 tasks</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#0F0F0F] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">Design</span>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5">
                          Implement optimistic UI state for Kanban drag-and-drop
                        </p>
                        {/* Animated Shimmer Progress Bar */}
                        <div className="w-full bg-[#EFEFEF] rounded-full h-1.5 mt-2.5 overflow-hidden">
                          <div className="bg-[#0F0F0F] h-full w-3/4 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-[#5A5A5A]">
                          <span className="text-[#0F0F0F] font-semibold">75% completed</span>
                          <span className="text-[#0F0F0F] font-bold">Today</span>
                        </div>
                      </div>

                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">AI Stream</span>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5">
                          Fine-tune streaming token responses in LLM chat UI
                        </p>
                        {/* Live streaming indicator */}
                        <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-[#5A5A5A]">
                          <span className="flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse [animation-delay:200ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse [animation-delay:400ms]" />
                          </span>
                          <span className="font-semibold text-[#0093A5]">Streaming live weights</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 - Done */}
                  <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E5E5E5] shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F0F0F] mb-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#27C93F]" /> Done
                      </span>
                      <span className="text-xs text-[#5A5A5A] font-semibold">5 tasks</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">Mobile</span>
                        <p className="text-xs font-semibold text-[#5A5A5A] line-through mt-0.5">
                          Integrate biometrics FaceID / TouchID auth prompt
                        </p>
                        <span className="text-[10px] text-[#0F0F0F] font-semibold mt-2.5 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#27C93F]" /> Verified in QA
                        </span>
                      </div>
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span className="text-[11px] font-medium text-[#5A5A5A]">Infrastructure</span>
                        <p className="text-xs font-semibold text-[#5A5A5A] line-through mt-0.5">
                          Zero-downtime PostgreSQL cluster migration to v16
                        </p>
                        <span className="text-[10px] text-[#0F0F0F] font-semibold mt-2.5 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#27C93F]" /> Merged & deployed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Throughput Metrics Interactive Preview */
                <div className="p-4 sm:p-6 bg-[#FFFFFF] rounded-xl border border-[#E5E5E5] shadow-xs animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E5E5E5]">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider">
                        Velocity SLA
                      </span>
                      <p className="text-xl font-extrabold text-[#0F0F0F] mt-1">94.2%</p>
                      <span className="text-[10px] text-[#27C93F] font-semibold">↑ +4.8% vs last sprint</span>
                    </div>
                    <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E5E5E5]">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider">
                        Cycle Duration
                      </span>
                      <p className="text-xl font-extrabold text-[#0F0F0F] mt-1">1.4 Days</p>
                      <span className="text-[10px] text-[#27C93F] font-semibold">↓ -0.6d turnaround</span>
                    </div>
                    <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E5E5E5]">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider">
                        Issues Resolved
                      </span>
                      <p className="text-xl font-extrabold text-[#0F0F0F] mt-1">54 Tickets</p>
                      <span className="text-[10px] text-[#0093A5] font-semibold">100% test coverage</span>
                    </div>
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { sprint: 'S1', velocity: 68 },
                          { sprint: 'S2', velocity: 76 },
                          { sprint: 'S3', velocity: 84 },
                          { sprint: 'S4', velocity: 81 },
                          { sprint: 'S5', velocity: 91 },
                          { sprint: 'S6', velocity: 95 },
                        ]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0F0F0F" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#0F0F0F" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="sprint" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                        <YAxis stroke="#8E8E8E" fontSize={11} tickLine={false} domain={[50, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0F0F0F',
                            borderColor: '#2C2C2C',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            fontSize: '11px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="velocity"
                          stroke="#0F0F0F"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#velocityGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A5A] mb-2 block">
            Capabilities Engineered for Scale
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F0F] tracking-tight">
            Everything your team needs to stay in sync
          </h2>
          <p className="text-[#5A5A5A] text-xs sm:text-sm mt-3">
            Replace fragmented spreadsheets, disconnected task trackers, and stale documentation with a cohesive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-6 shadow-subtle hover:shadow-card hover:border-[#B0B0B0]/70 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F0F0F] mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration Workflow Section */}
      <section id="workflow" className="py-20 bg-[#0F0F0F] text-white px-4 sm:px-6 lg:px-8 border-y border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B0B0B0] mb-2 block">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              From roadmap conception to production shipping
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#171717] border border-[#2A2A2A] flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-[#FFFFFF] mb-4 block font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-[#B0B0B0] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-[#0F0F0F] border border-[#262626] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-b from-[#2A2A2A]/40 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8E8E8E] mb-3">
              Enterprise Collaboration Platform
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              Ready to modernize your team's project velocity?
            </h2>
            <p className="text-xs sm:text-sm text-[#B0B0B0] max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Experience the unified monochrome workspace engineered for high-velocity engineering, design ateliers, and product teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link to="/app" className="w-full sm:w-auto">
                <Button size="lg" variant="white" rightIcon={ArrowRight} className="w-full sm:w-auto px-6">
                  Launch Live Workspace
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" variant="dark" className="w-full sm:w-auto px-6">
                  Sign Up for Free
                </Button>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-8 border-t border-[#222222] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#8E8E8E] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" /> Instant workspace setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" /> SOC-2 Type II Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#5A5A5A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-[#0F0F0F] text-sm">ProjX Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link to="/app" className="hover:text-[#0F0F0F] transition-colors">
              App Dashboard
            </Link>
            <Link to="/login" className="hover:text-[#0F0F0F] transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-[#0F0F0F] transition-colors">
              Register
            </Link>
            <a href="#features" className="hover:text-[#0F0F0F] transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-[#0F0F0F] transition-colors">
              Methodology
            </a>
          </div>

          <p>© 2026 ProjX Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
