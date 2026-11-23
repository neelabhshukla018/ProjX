import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  CheckSquare,
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
import GradientBars from '../components/common/GradientBars';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { heroEntrance } from '../utils/animations';

const CURRENT_YEAR = new Date().getFullYear();

export const LandingPage = () => {
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState('kanban');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      heroEntrance(heroRef.current);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Top Navigation - Compact Floating 3D Capsule coming out of window */}
      <header className="fixed top-2.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto w-full rounded-full bg-[#FFFFFF]/92 backdrop-blur-2xl border border-white/80 ring-1 ring-black/[0.08] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.18),0_8px_16px_-4px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.04)] sm:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.22),0_10px_20px_-5px_rgba(0,0,0,0.10),inset_0_1.5px_1.5px_rgba(255,255,255,1),inset_0_-1.5px_1px_rgba(0,0,0,0.05)] px-3 sm:px-6 flex items-center justify-between transition-all duration-300 ease-out hover:shadow-[0_28px_55px_-10px_rgba(0,0,0,0.26),0_12px_24px_-5px_rgba(0,0,0,0.12),inset_0_1.5px_1.5px_rgba(255,255,255,1),inset_0_-1.5px_1px_rgba(0,0,0,0.05)] ${
            isScrolled ? 'h-[38px] sm:h-11 md:h-12 max-w-4xl lg:max-w-5xl' : 'h-[44px] sm:h-14 md:h-15 max-w-5xl lg:max-w-6xl'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-xs sm:shadow-md shadow-black/20 relative group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#FFFFFF]" />
            </div>
            <span className="font-bold text-xs sm:text-base md:text-lg text-[#0F0F0F] tracking-tight flex items-center">
              Proj<span className="text-[#0F0F0F] font-bold" style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span>
            </span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#5A5A5A]">
            <a
              href="#features"
              className="px-3 sm:px-3.5 py-1.5 rounded-full hover:text-[#0F0F0F] hover:bg-black/[0.05] transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="px-3 sm:px-3.5 py-1.5 rounded-full hover:text-[#0F0F0F] hover:bg-black/[0.05] transition-colors"
            >
              Product Tour
            </a>
            <a
              href="#workflow"
              className="px-3 sm:px-3.5 py-1.5 rounded-full hover:text-[#0F0F0F] hover:bg-black/[0.05] transition-colors"
            >
              Methodology
            </a>
            <a
              href="#security"
              className="px-3 sm:px-3.5 py-1.5 rounded-full hover:text-[#0F0F0F] hover:bg-black/[0.05] transition-colors"
            >
              Enterprise
            </a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              to="/login"
              className="text-[11px] sm:text-sm font-semibold text-[#2C2C2C] hover:text-[#0F0F0F] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-black/[0.05] transition-colors"
            >
              Sign In
            </Link>
            <Link to="/app">
              <Button
                size="sm"
                variant="primary"
                rightIcon={ArrowRight}
                className="!py-1 sm:!py-2 !px-2.5 sm:!px-4 !text-[11px] sm:!text-sm !rounded-full shadow-xs sm:shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
              >
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Bars Background (inspired by @waleedkibhen on 21st.dev) */}
        <GradientBars
          numBars={15}
          gradientFrom="rgba(255, 60, 0, 0.12)"
          gradientTo="rgba(255, 60, 0, 0.045)"
          animationDuration={2.6}
          minHeight={28}
          maxHeight={100}
          barBorderColor="rgba(255, 60, 0, 0.025)"
        />

        {/* Top-left flank glow (soft faded reach on the left side) */}
        <div
          className="absolute top-0 left-0 w-80 sm:w-96 h-64 bg-gradient-to-br from-[rgba(255,60,0,0.045)] via-[rgba(255,60,0,0.01)] to-transparent pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Top-right flank glow (soft faded reach on the right side) */}
        <div
          className="absolute top-0 right-0 w-80 sm:w-96 h-64 bg-gradient-to-bl from-[rgba(255,60,0,0.045)] via-[rgba(255,60,0,0.01)] to-transparent pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient bottom underglow connecting the bars with the dashboard preview */}
        <div
          className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[rgba(255,60,0,0.05)] via-[rgba(255,60,0,0.015)] to-transparent pointer-events-none z-0"
          aria-hidden="true"
        />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
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
        <div id="preview" className="hidden md:block relative z-10 max-w-6xl mx-auto mt-10 sm:mt-16">
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
                    <div className="space-y-3">
                      {/* Card 1: Frontend WCAG */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#0F0F0F] transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                        {/* Left edge accent beam on hover */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F0F0F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        {/* Light shimmer sweep on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#5A5A5A] px-2 py-0.5 rounded-md bg-[#F5F5F5] border border-[#EAEAEA] group-hover:border-[#D5D5D5] transition-colors">
                            Frontend
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#8E8E8E] font-mono">
                            PROJX-104
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5 leading-snug group-hover:text-[#000000] transition-colors">
                          Audit WCAG AA compliance across dark & light themes
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0F0F0] text-[10px] text-[#5A5A5A]">
                          <span className="flex items-center gap-1">
                            <CheckSquare className="w-3 h-3 text-[#8E8E8E] group-hover:text-[#0F0F0F] transition-colors" />
                            <span>2/3 subtasks</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#0F0F0F] font-bold">
                              3d left
                            </span>
                            <div className="w-4 h-4 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-[8px] font-bold">
                              AR
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: DevOps Penetration Testing */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#0F0F0F] transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F0F0F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#5A5A5A] px-2 py-0.5 rounded-md bg-[#F5F5F5] border border-[#EAEAEA] group-hover:border-[#D5D5D5] transition-colors">
                            DevOps
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#8E8E8E] font-mono">
                            PROJX-112
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5 leading-snug group-hover:text-[#000000] transition-colors">
                          Setup automated penetration test matrix for API gateway
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0F0F0] text-[10px] text-[#5A5A5A]">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#8E8E8E] group-hover:text-[#0F0F0F] transition-colors" />
                            <span>0/4 subtasks</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#5A5A5A] font-semibold">
                              5d left
                            </span>
                            <div className="w-4 h-4 rounded-full bg-[#2C2C2C] text-white flex items-center justify-center text-[8px] font-bold">
                              MK
                            </div>
                          </div>
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
                    <div className="space-y-3">
                      {/* Card 3: Design Drag-and-Drop */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#0F0F0F] shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#0F0F0F] transition-all duration-300 ease-out cursor-pointer overflow-hidden ring-1 ring-[#0F0F0F]/10">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0093A5] opacity-100 pointer-events-none" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#0093A5] px-2 py-0.5 rounded-md bg-[#0093A5]/10 border border-[#0093A5]/20">
                            Design
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#0093A5] font-mono font-bold">
                            PROJX-108
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5 leading-snug group-hover:text-[#000000] transition-colors">
                          Implement optimistic UI state for Kanban drag-and-drop
                        </p>
                        {/* Animated Shimmer Progress Bar */}
                        <div className="w-full bg-[#EFEFEF] rounded-full h-1.5 mt-2.5 overflow-hidden">
                          <div className="bg-[#0F0F0F] h-full w-3/4 rounded-full relative overflow-hidden transition-all duration-500 group-hover:w-[85%]">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F0F0F0] text-[10px]">
                          <div className="flex items-center gap-1.5 text-[#0F0F0F] font-semibold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0093A5] opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0093A5]" />
                            </span>
                            <span>75% completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#0F0F0F] text-white font-bold text-[9px]">
                              Today
                            </span>
                            <div className="w-4 h-4 rounded-full bg-[#0093A5] text-white flex items-center justify-center text-[8px] font-bold">
                              SL
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 4: AI Stream */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#0F0F0F] transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0093A5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#5A5A5A] px-2 py-0.5 rounded-md bg-[#F5F5F5] border border-[#EAEAEA] group-hover:border-[#0093A5]/30 transition-colors">
                            AI Stream
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#8E8E8E] font-mono">
                            PROJX-119
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#0F0F0F] mt-0.5 leading-snug group-hover:text-[#000000] transition-colors">
                          Fine-tune streaming token responses in LLM chat UI
                        </p>
                        {/* Live streaming animated indicator */}
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0F0F0] text-[10px]">
                          <div className="flex items-center gap-1.5 text-[#0093A5] font-semibold">
                            <span className="flex gap-1 items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse [animation-delay:200ms]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0093A5] animate-pulse [animation-delay:400ms]" />
                            </span>
                            <span>Streaming live weights</span>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-[8px] font-bold">
                            EV
                          </div>
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
                    <div className="space-y-3">
                      {/* Card 5: Mobile */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#27C93F] transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#27C93F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#5A5A5A] px-2 py-0.5 rounded-md bg-[#F5F5F5] border border-[#EAEAEA]">
                            Mobile
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#8E8E8E] font-mono">
                            PROJX-94
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#5A5A5A] line-through mt-0.5 leading-snug group-hover:text-[#2C2C2C] transition-colors">
                          Integrate biometrics FaceID / TouchID auth prompt
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0F0F0] text-[10px]">
                          <span className="text-[#27C93F] font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#27C93F]" /> Verified in QA
                          </span>
                          <div className="w-4 h-4 rounded-full bg-[#27C93F] text-white flex items-center justify-center text-[8px] font-bold">
                            AR
                          </div>
                        </div>
                      </div>

                      {/* Card 6: Infrastructure */}
                      <div className="group relative bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E5E5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#27C93F] transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#27C93F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-[#5A5A5A] px-2 py-0.5 rounded-md bg-[#F5F5F5] border border-[#EAEAEA]">
                            Infrastructure
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#8E8E8E] font-mono">
                            PROJX-88
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#5A5A5A] line-through mt-0.5 leading-snug group-hover:text-[#2C2C2C] transition-colors">
                          Zero-downtime PostgreSQL cluster migration to v16
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0F0F0] text-[10px]">
                          <span className="text-[#0F0F0F] font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#27C93F]" /> Merged & deployed
                          </span>
                          <div className="w-4 h-4 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-[8px] font-bold">
                            SL
                          </div>
                        </div>
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
                className="group relative bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-6 shadow-subtle hover:shadow-xl hover:border-[#0F0F0F] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Left Edge Accent Beam on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F0F0F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Ambient Light Reflection Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/[0.03] to-transparent transition-transform duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-[#000000] transition-all duration-200 shadow-xs">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {feature.tag && (
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F5F5F5] border border-[#EAEAEA] text-[#5A5A5A] group-hover:border-[#D5D5D5] transition-colors">
                        {feature.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-[#0F0F0F] mb-2 tracking-tight group-hover:text-[#000000] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F5F5F5] text-xs font-semibold text-[#5A5A5A] group-hover:text-[#0F0F0F] transition-colors">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
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
                className="group relative p-6 rounded-xl bg-[#171717] border border-[#2A2A2A] hover:border-[#404040] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Top Subtle Sheen Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <span className="text-3xl font-black text-[#FFFFFF] mb-4 block font-mono group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:translate-x-0.5 transition-transform duration-200">
                    {step.title}
                  </h4>
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

      {/* Modern Responsive Footer */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-xs text-[#5A5A5A]">
        <div className="max-w-7xl mx-auto">
          {/* Top Multi-Column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12">
            {/* Brand Column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base sm:text-lg text-[#0F0F0F] tracking-tight flex items-center">
                  Proj<span className="text-[#0F0F0F] font-bold" style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span>
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-[#5A5A5A] max-w-sm leading-relaxed font-normal">
                The monochrome standard for high-velocity teams, product architects, and engineering ateliers.
              </p>
            
            </div>

            {/* Column 1: Product */}
            <div className="col-span-1 space-y-3">
              <p className="font-semibold text-xs text-[#0F0F0F] uppercase tracking-wider">
                Product
              </p>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link to="/app" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Live Workspace
                  </Link>
                </li>
                <li>
                  <Link to="/app/projects" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Kanban Boards
                  </Link>
                </li>
                <li>
                  <Link to="/app/tasks" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Task Velocity
                  </Link>
                </li>
                <li>
                  <Link to="/app/teams" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Team Directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div className="col-span-1 space-y-3">
              <p className="font-semibold text-xs text-[#0F0F0F] uppercase tracking-wider">
                Explore
              </p>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="#features" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Core Features
                  </a>
                </li>
                <li>
                  <a href="#preview" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Product Tour
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Security & SOC-2
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Account */}
            <div className="col-span-1 space-y-3">
              <p className="font-semibold text-xs text-[#0F0F0F] uppercase tracking-wider">
                Account
              </p>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link to="/login" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link to="/app/settings" className="hover:text-[#0F0F0F] transition-colors block py-0.5">
                    Workspace Config
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#808080]">
            <p className="flex items-center gap-1.5 text-center sm:text-left">
              © {CURRENT_YEAR} Proj<span style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span> Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 font-medium text-[#5A5A5A]">
              <span className="hover:text-[#0F0F0F] cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-[#0F0F0F] cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-[#0F0F0F] cursor-pointer transition-colors">Security Whitepaper</span>
              <span className="hidden sm:inline text-[#D4D4D4]">•</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
