import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Layers,
  Compass,
  Palette,
  Code2,
  Server,
  GitMerge,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Check,
  RotateCcw,
  GitBranch,
  Zap,
  Activity,
  Gauge,
} from 'lucide-react';
import { isReducedMotion } from '../../utils/animations';

/**
 * 7-Stage Horizontal Branching Workflow with Distinct Branch Colors
 * Structure: PROJECT -> PLANNING -> 3 PARALLEL BRANCHES (DESIGN, FRONTEND, BACKEND) -> INTEGRATION -> TESTING -> DEPLOY -> COMPLETED
 */
const WORKFLOW_NODES = [
  {
    id: 'project',
    col: 1,
    title: 'Project',
    subtitle: 'Init & Specs',
    code: '01',
    icon: Layers,
    x: 26,
    y: 142,
    w: 106,
    h: 56,
    branch: 'main',
    metric: 'Workspace Ready',
    stepIndex: 1,
    color: '#F59E0B', // Amber
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    hoverBorder: 'border-amber-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    id: 'planning',
    col: 2,
    title: 'Planning',
    subtitle: 'Roadmap & PRD',
    code: '02',
    icon: Compass,
    x: 168,
    y: 142,
    w: 106,
    h: 56,
    branch: 'main',
    metric: 'Sprint S42',
    stepIndex: 2,
    color: '#EAB308', // Yellow/Gold
    badgeBg: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    hoverBorder: 'border-yellow-500',
    glowColor: 'rgba(234, 179, 8, 0.4)',
  },
  // Three Parallel Branches with Distinct Colors
  {
    id: 'design',
    col: 3,
    title: 'Design',
    subtitle: 'Design System',
    code: '3A',
    icon: Palette,
    x: 328,
    y: 46,
    w: 112,
    h: 56,
    branch: 'design',
    metric: 'Figma Tokens',
    stepIndex: 3,
    color: '#EC4899', // Vibrant Fuchsia / Pink
    badgeBg: 'bg-pink-500/10 text-pink-600 border-pink-500/30',
    hoverBorder: 'border-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.45)',
  },
  {
    id: 'frontend',
    col: 3,
    title: 'Frontend',
    subtitle: 'Client Components',
    code: '3B',
    icon: Code2,
    x: 328,
    y: 142,
    w: 112,
    h: 56,
    branch: 'frontend',
    metric: 'Vite / React',
    stepIndex: 3,
    color: '#06B6D4', // Cyber Cyan / Mint
    badgeBg: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30',
    hoverBorder: 'border-cyan-500',
    glowColor: 'rgba(6, 182, 212, 0.45)',
  },
  {
    id: 'backend',
    col: 3,
    title: 'Backend',
    subtitle: 'API & Services',
    code: '3C',
    icon: Server,
    x: 328,
    y: 238,
    w: 112,
    h: 56,
    branch: 'backend',
    metric: 'GraphQL / SQL',
    stepIndex: 3,
    color: '#8B5CF6', // Electric Purple / Violet
    badgeBg: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    hoverBorder: 'border-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.45)',
  },
  // Convergence into Integration
  {
    id: 'integration',
    col: 4,
    title: 'Integration',
    subtitle: 'PR Convergence',
    code: '04',
    icon: GitMerge,
    x: 494,
    y: 142,
    w: 112,
    h: 56,
    branch: 'main',
    metric: '3 Branches Merged',
    stepIndex: 4,
    color: '#6366F1', // Indigo Spectrum
    badgeBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
    hoverBorder: 'border-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.45)',
  },
  {
    id: 'testing',
    col: 5,
    title: 'Testing',
    subtitle: 'E2E & Security',
    code: '05',
    icon: ShieldCheck,
    x: 642,
    y: 142,
    w: 106,
    h: 56,
    branch: 'main',
    metric: '100% CI Passes',
    stepIndex: 5,
    color: '#3B82F6', // Cobalt Blue
    badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    hoverBorder: 'border-blue-500',
    glowColor: 'rgba(59, 130, 246, 0.45)',
  },
  {
    id: 'deployment',
    col: 6,
    title: 'Deploy',
    subtitle: 'Canary Release',
    code: '06',
    icon: Rocket,
    x: 784,
    y: 142,
    w: 106,
    h: 56,
    branch: 'main',
    metric: 'Multi-Region',
    stepIndex: 6,
    color: '#0D9488', // Teal
    badgeBg: 'bg-teal-500/10 text-teal-600 border-teal-500/30',
    hoverBorder: 'border-teal-500',
    glowColor: 'rgba(13, 148, 136, 0.45)',
  },
  {
    id: 'completed',
    col: 7,
    title: 'Completed',
    subtitle: 'Production Live',
    code: '✓',
    icon: CheckCircle2,
    x: 926,
    y: 142,
    w: 108,
    h: 56,
    branch: 'main',
    metric: 'Zero Downtime',
    stepIndex: 7,
    color: '#10B981', // Emerald Green
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    hoverBorder: 'border-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
];

/**
 * Connectors with Distinct Color Coding
 */
const WORKFLOW_PATHS = [
  {
    id: 'path-project-planning',
    from: 'project',
    to: 'planning',
    d: 'M 132 170 L 168 170',
    color: '#F59E0B',
    pulseColor: '#FDE68A',
    gradientId: 'grad-project',
  },
  // Branching Out: Planning to 3 parallel colored branches
  {
    id: 'path-planning-design',
    from: 'planning',
    to: 'design',
    d: 'M 274 170 C 298 170, 304 74, 328 74',
    color: '#EC4899', // Fuchsia / Pink
    pulseColor: '#F472B6',
    gradientId: 'grad-design',
  },
  {
    id: 'path-planning-frontend',
    from: 'planning',
    to: 'frontend',
    d: 'M 274 170 L 328 170',
    color: '#06B6D4', // Cyan
    pulseColor: '#67E8F9',
    gradientId: 'grad-frontend',
  },
  {
    id: 'path-planning-backend',
    from: 'planning',
    to: 'backend',
    d: 'M 274 170 C 298 170, 304 266, 328 266',
    color: '#8B5CF6', // Purple
    pulseColor: '#C4B5FD',
    gradientId: 'grad-backend',
  },
  // Merging In: 3 colored branches into Integration
  {
    id: 'path-design-integration',
    from: 'design',
    to: 'integration',
    d: 'M 440 74 C 464 74, 470 170, 494 170',
    color: '#EC4899', // Fuchsia
    pulseColor: '#F472B6',
    gradientId: 'grad-design',
  },
  {
    id: 'path-frontend-integration',
    from: 'frontend',
    to: 'integration',
    d: 'M 440 170 L 494 170',
    color: '#06B6D4', // Cyan
    pulseColor: '#67E8F9',
    gradientId: 'grad-frontend',
  },
  {
    id: 'path-backend-integration',
    from: 'backend',
    to: 'integration',
    d: 'M 440 266 C 464 266, 470 170, 494 170',
    color: '#8B5CF6', // Purple
    pulseColor: '#C4B5FD',
    gradientId: 'grad-backend',
  },
  // Linear Convergence to Completed
  {
    id: 'path-integration-testing',
    from: 'integration',
    to: 'testing',
    d: 'M 606 170 L 642 170',
    color: '#6366F1', // Indigo
    pulseColor: '#A5B4FC',
    gradientId: 'grad-integration',
  },
  {
    id: 'path-testing-deployment',
    from: 'testing',
    to: 'deployment',
    d: 'M 748 170 L 784 170',
    color: '#3B82F6', // Blue
    pulseColor: '#93C5FD',
    gradientId: 'grad-testing',
  },
  {
    id: 'path-deployment-completed',
    from: 'deployment',
    to: 'completed',
    d: 'M 890 170 L 926 170',
    color: '#10B981', // Emerald
    pulseColor: '#6EE7B7',
    gradientId: 'grad-completed',
  },
];

export const HorizontalBranchingWorkflow = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [currentSpeedDisplay, setCurrentSpeedDisplay] = useState(1.0);
  const [isFastScrolling, setIsFastScrolling] = useState(false);

  const svgContainerRef = useRef(null);
  const speedRef = useRef(1.0);
  const offsetRef = useRef(0);
  const isReduced = useRef(isReducedMotion());

  // Check if a path connects to the hovered node
  const isPathHighlighted = useCallback(
    (path) => {
      if (!hoveredNodeId) return false;
      return path.from === hoveredNodeId || path.to === hoveredNodeId;
    },
    [hoveredNodeId]
  );

  // 1. Scroll-Driven Velocity Acceleration
  // Specifically accelerates into turbo speed when scrolling up (deltaY < 0)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const deltaY = currentY - lastScrollY; // Negative when scrolling UP

      // Calculate scroll speed in px/ms
      const scrollSpeed = Math.abs(deltaY) / dt;

      if (deltaY < 0) {
        // SCROLLING UP: High-velocity acceleration!
        // Boost speed up to 8x - 12x depending on upward scroll intensity
        const boostedSpeed = Math.min(2.5 + scrollSpeed * 18, 12.0);
        speedRef.current = Math.max(speedRef.current, boostedSpeed);
      } else if (deltaY > 0) {
        // SCROLLING DOWN: Moderate acceleration
        const boostedSpeed = Math.min(1.5 + scrollSpeed * 8, 5.0);
        speedRef.current = Math.max(speedRef.current, boostedSpeed);
      }

      lastScrollY = currentY;
      lastTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. High-Performance 60FPS Continuous Animation Loop
  // Updates CSS custom properties on the SVG container to drive continuous streaming flow
  useEffect(() => {
    if (isReduced.current) return;

    let rafId;
    let lastUpdateDisplay = 0;

    const animateLoop = (time) => {
      // Smooth decay back to base 1.0x speed
      const targetBaseSpeed = 1.0;
      speedRef.current += (targetBaseSpeed - speedRef.current) * 0.045;

      // Advance dash offset based on dynamic speed
      const speed = speedRef.current;
      offsetRef.current = (offsetRef.current + 1.4 * speed) % 10000;

      // Update CSS custom properties directly on the container (zero React re-render overhead)
      if (svgContainerRef.current) {
        svgContainerRef.current.style.setProperty('--flow-offset', `${offsetRef.current}px`);
        svgContainerRef.current.style.setProperty(
          '--pulse-offset',
          `${offsetRef.current * 1.85}px`
        );
      }

      // Throttle UI speed counter display to ~10 times/second
      if (time - lastUpdateDisplay > 100) {
        setCurrentSpeedDisplay(parseFloat(speed.toFixed(1)));
        setIsFastScrolling(speed > 1.8);
        lastUpdateDisplay = time;
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    rafId = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Manual Turbo Speed Boost on button click
  const triggerTurboBoost = () => {
    speedRef.current = 8.5;
  };

  const hoveredNode = WORKFLOW_NODES.find((n) => n.id === hoveredNodeId);

  return (
    <div
      ref={svgContainerRef}
      className="relative w-full select-none flex flex-col justify-between overflow-hidden"
      style={{
        '--flow-offset': '0px',
        '--pulse-offset': '0px',
      }}
    >
      {/* Top Header Bar: Real-time Velocity & Color Branch Indicator */}
      <div className="flex items-center justify-between pb-2.5 mb-1 px-1 border-b border-[#EFEFEF] text-[11px] text-[#5A5A5A]">
        {/* Left: Active Branch & Live Running Speed */}
      

        {/* Right: Branch Legend & Manual Turbo Boost Button */}
     
      </div>

      {/* Main Responsive SVG Canvas (1060 x 340) */}
      <div className="relative w-full max-w-full overflow-hidden flex items-center justify-center py-1">
        <svg
          viewBox="0 0 1060 340"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block max-h-[360px]"
        >
          <defs>
            {/* Color-specific glow filters */}
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#EC4899" floodOpacity="0.65" />
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06B6D4" floodOpacity="0.65" />
            </filter>
            <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#8B5CF6" floodOpacity="0.65" />
            </filter>
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.65" />
            </filter>
            <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10B981" floodOpacity="0.65" />
            </filter>

            {/* Linear Gradients for Connectors */}
            <linearGradient id="grad-project" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>

            <linearGradient id="grad-design" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            <linearGradient id="grad-frontend" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <linearGradient id="grad-backend" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>

            <linearGradient id="grad-integration" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            <linearGradient id="grad-testing" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>

            <linearGradient id="grad-completed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Dot Grid Background */}
            <pattern id="wfGridMulti" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#0F0F0F" fillOpacity="0.04" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="1060" height="340" fill="url(#wfGridMulti)" rx="12" />

          {/* 1. Base Static Guide Traces */}
          <g className="base-guide-lines" opacity="0.3">
            {WORKFLOW_PATHS.map((p) => (
              <path
                key={`base-${p.id}`}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            ))}
          </g>

          {/* 2. Continuous Flowing Colored Connector Streams (Always Animated) */}
          <g className="flowing-streams">
            {WORKFLOW_PATHS.map((p) => {
              const highlighted = isPathHighlighted(p);
              return (
                <path
                  key={`flow-${p.id}`}
                  d={p.d}
                  fill="none"
                  stroke={`url(#${p.gradientId})`}
                  strokeWidth={highlighted ? 3.2 : 2.2}
                  strokeLinecap="round"
                  strokeDasharray="10 8"
                  style={{
                    strokeDashoffset: 'calc(-1 * var(--flow-offset, 0px))',
                    filter: highlighted
                      ? p.color === '#EC4899'
                        ? 'url(#glow-pink)'
                        : p.color === '#06B6D4'
                        ? 'url(#glow-cyan)'
                        : p.color === '#8B5CF6'
                        ? 'url(#glow-purple)'
                        : 'url(#glow-gold)'
                      : undefined,
                    opacity: hoveredNodeId ? (highlighted ? 1 : 0.25) : 0.95,
                    transition: 'stroke-width 200ms ease, opacity 200ms ease',
                  }}
                />
              );
            })}
          </g>

          {/* 3. Fast Traveling Energy Laser Pulses (Accelerates on scroll up) */}
          <g className="laser-pulses">
            {WORKFLOW_PATHS.map((p) => (
              <path
                key={`laser-${p.id}`}
                d={p.d}
                fill="none"
                stroke={p.pulseColor}
                strokeWidth={isFastScrolling ? 3.5 : 2.5}
                strokeLinecap="round"
                strokeDasharray="28 90"
                style={{
                  strokeDashoffset: 'calc(-1 * var(--pulse-offset, 0px))',
                  opacity: isFastScrolling ? 1 : 0.75,
                }}
              />
            ))}
          </g>

          {/* 4. Branching Junction Dots */}
          {/* Divergence Point at Planning output (274, 170) */}
          <circle
            cx="274"
            cy="170"
            r={isFastScrolling ? 4.5 : 3.5}
            fill="#F59E0B"
            className="transition-all duration-300"
          />
          {/* Convergence Point at Integration input (494, 170) */}
          <circle
            cx="494"
            cy="170"
            r={isFastScrolling ? 4.5 : 3.5}
            fill="#6366F1"
            className="transition-all duration-300"
          />

          {/* 5. Parallel Branch Track Labels */}
        

          {/* 6. Compact Rectangular Nodes */}
          {WORKFLOW_NODES.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNodeId === node.id;
            const isConnected =
              hoveredNodeId &&
              WORKFLOW_PATHS.some(
                (p) =>
                  (p.from === hoveredNodeId && p.to === node.id) ||
                  (p.to === hoveredNodeId && p.from === node.id)
              );

            return (
              <foreignObject
                key={node.id}
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                className="overflow-visible"
              >
                <div
                  id={`card-${node.id}`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`w-full h-full rounded-lg border flex flex-col justify-between p-2 cursor-pointer transition-all duration-200 ease-out ${
                    isHovered
                      ? `${node.hoverBorder} bg-[#FFFFFF] shadow-md -translate-y-0.5 z-30`
                      : isConnected
                      ? `${node.hoverBorder} bg-[#FFFFFF] shadow-xs z-20`
                      : 'border-[#E5E5E5] bg-[#FFFFFF] shadow-2xs hover:border-[#0F0F0F]'
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 0 16px ${node.glowColor}`
                      : undefined,
                    opacity: hoveredNodeId && !isHovered && !isConnected ? 0.45 : 1,
                  }}
                >
                  {/* Top Bar inside Node: Colored Icon Box + Status Indicator */}
                  <div className="flex items-center justify-between pointer-events-none">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-200 ${
                        isHovered
                          ? 'bg-[#0F0F0F] text-[#FFFFFF]'
                          : node.badgeBg
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>

                    {/* Small Status Indicator */}
                    <div className="flex items-center gap-1">
                      {node.id === 'completed' ? (
                        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-[#FFFFFF] shadow-2xs">
                          <Check className="w-2.5 h-2.5 text-[#FFFFFF]" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="relative flex h-2 w-2">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: node.color }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: node.color }}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar: Title & Code */}
                  <div className="flex items-baseline justify-between mt-1 pointer-events-none">
                    <span
                      className={`text-[11px] font-bold tracking-tight truncate leading-none ${
                        isHovered ? 'text-[#0F0F0F]' : 'text-[#2C2C2C]'
                      }`}
                    >
                      {node.title}
                    </span>
                    <span
                      className="text-[9px] font-mono font-bold"
                      style={{ color: node.color }}
                    >
                      {node.code}
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Telemetry Strip */}
      <div className="mt-1 pt-2 px-2 border-t border-[#EFEFEF] flex items-center justify-between text-[11px] text-[#5A5A5A]">
        {hoveredNode ? (
          <div className="flex items-center gap-2 animate-in fade-in duration-150">
            <span
              className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold text-white shadow-2xs"
              style={{ backgroundColor: hoveredNode.color }}
            >
              {hoveredNode.code}
            </span>
            <span className="font-bold text-[#0F0F0F]">{hoveredNode.title} Stage:</span>
            <span className="text-[#5A5A5A]">{hoveredNode.subtitle}</span>
            <span className="text-[#8E8E8E]">({hoveredNode.metric})</span>
            <span className="hidden sm:inline text-[#B0B0B0]">• Path illuminated</span>
          </div>
        ) : (
          <div >
           
          </div>
        )}

        {/* Speed Indicator Pill */}
   
      </div>
    </div>
  );
};

export default HorizontalBranchingWorkflow;
