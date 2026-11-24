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
 * 7-Stage Horizontal Branching Workflow with Unified Black & Cream Palette
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
    x: 20,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: 'Workspace Ready',
    stepIndex: 1,
    color: '#29251F', // Amber
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'planning',
    col: 2,
    title: 'Planning',
    subtitle: 'Roadmap & PRD',
    code: '02',
    icon: Compass,
    x: 180,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: 'Sprint S42',
    stepIndex: 2,
    color: '#29251F', // Yellow/Gold
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  // Three Parallel Branches with Distinct Colors
  {
    id: 'design',
    col: 3,
    title: 'Design',
    subtitle: 'Design System',
    code: '3A',
    icon: Palette,
    x: 370,
    y: 44,
    w: 132,
    h: 76,
    branch: 'design',
    metric: 'Figma Tokens',
    stepIndex: 3,
    color: '#29251F', // Vibrant Fuchsia / Pink
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'frontend',
    col: 3,
    title: 'Frontend',
    subtitle: 'Client Components',
    code: '3B',
    icon: Code2,
    x: 370,
    y: 142,
    w: 132,
    h: 76,
    branch: 'frontend',
    metric: 'Vite / React',
    stepIndex: 3,
    color: '#29251F', // Cyber Cyan / Mint
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'backend',
    col: 3,
    title: 'Backend',
    subtitle: 'API & Services',
    code: '3C',
    icon: Server,
    x: 370,
    y: 240,
    w: 132,
    h: 76,
    branch: 'backend',
    metric: 'GraphQL / SQL',
    stepIndex: 3,
    color: '#29251F', // Electric Purple / Violet
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  // Convergence into Integration
  {
    id: 'integration',
    col: 4,
    title: 'Integration',
    subtitle: 'PR Convergence',
    code: '04',
    icon: GitMerge,
    x: 560,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: '3 Branches Merged',
    stepIndex: 4,
    color: '#29251F', // Indigo Spectrum
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'testing',
    col: 5,
    title: 'Testing',
    subtitle: 'E2E & Security',
    code: '05',
    icon: ShieldCheck,
    x: 720,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: '100% CI Passes',
    stepIndex: 5,
    color: '#29251F', // Cobalt Blue
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'deployment',
    col: 6,
    title: 'Deploy',
    subtitle: 'Canary Release',
    code: '06',
    icon: Rocket,
    x: 880,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: 'Multi-Region',
    stepIndex: 6,
    color: '#29251F', // Teal
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
  {
    id: 'completed',
    col: 7,
    title: 'Completed',
    subtitle: 'Production Live',
    code: '✓',
    icon: CheckCircle2,
    x: 1040,
    y: 142,
    w: 132,
    h: 76,
    branch: 'main',
    metric: 'Zero Downtime',
    stepIndex: 7,
    color: '#29251F', // Emerald Green
    badgeBg: 'bg-[#EDE5D8] text-[#29251F] border-[#D6CCBD]',
    hoverBorder: 'border-[#29251F]',
    glowColor: 'rgba(41, 37, 31, 0.16)',
  },
];

/**
 * Connectors with a Unified Neutral Palette
 */
const WORKFLOW_PATHS = [
  {
    id: 'path-project-planning',
    from: 'project',
    to: 'planning',
    d: 'M 152 180 L 180 180',
    color: '#29251F',
    pulseColor: '#B8AA96',
    gradientId: 'grad-project',
  },
  // Branching Out: Planning to 3 parallel colored branches
  {
    id: 'path-planning-design',
    from: 'planning',
    to: 'design',
    d: 'M 312 180 C 342 180, 340 82, 370 82',
    color: '#29251F', // Fuchsia / Pink
    pulseColor: '#B8AA96',
    gradientId: 'grad-design',
  },
  {
    id: 'path-planning-frontend',
    from: 'planning',
    to: 'frontend',
    d: 'M 312 180 L 370 180',
    color: '#29251F', // Cyan
    pulseColor: '#B8AA96',
    gradientId: 'grad-frontend',
  },
  {
    id: 'path-planning-backend',
    from: 'planning',
    to: 'backend',
    d: 'M 312 180 C 342 180, 340 278, 370 278',
    color: '#29251F', // Purple
    pulseColor: '#B8AA96',
    gradientId: 'grad-backend',
  },
  // Merging In: 3 colored branches into Integration
  {
    id: 'path-design-integration',
    from: 'design',
    to: 'integration',
    d: 'M 502 82 C 532 82, 530 180, 560 180',
    color: '#29251F', // Fuchsia
    pulseColor: '#B8AA96',
    gradientId: 'grad-design',
  },
  {
    id: 'path-frontend-integration',
    from: 'frontend',
    to: 'integration',
    d: 'M 502 180 L 560 180',
    color: '#29251F', // Cyan
    pulseColor: '#B8AA96',
    gradientId: 'grad-frontend',
  },
  {
    id: 'path-backend-integration',
    from: 'backend',
    to: 'integration',
    d: 'M 502 278 C 532 278, 530 180, 560 180',
    color: '#29251F', // Purple
    pulseColor: '#B8AA96',
    gradientId: 'grad-backend',
  },
  // Linear Convergence to Completed
  {
    id: 'path-integration-testing',
    from: 'integration',
    to: 'testing',
    d: 'M 692 180 L 720 180',
    color: '#29251F', // Indigo
    pulseColor: '#B8AA96',
    gradientId: 'grad-integration',
  },
  {
    id: 'path-testing-deployment',
    from: 'testing',
    to: 'deployment',
    d: 'M 852 180 L 880 180',
    color: '#29251F', // Blue
    pulseColor: '#B8AA96',
    gradientId: 'grad-testing',
  },
  {
    id: 'path-deployment-completed',
    from: 'deployment',
    to: 'completed',
    d: 'M 1012 180 L 1040 180',
    color: '#29251F', // Emerald
    pulseColor: '#B8AA96',
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
      <div className="flex items-center justify-between pb-2.5 mb-1 px-1 border-b border-[#D6CCBD] text-[11px] text-[#6F675D]">
        {/* Left: Active Branch & Live Running Speed */}
      

        {/* Right: Branch Legend & Manual Turbo Boost Button */}
     
      </div>

      {/* Main Responsive SVG Canvas (1060 x 340) */}
      <div className="relative w-full max-w-full overflow-hidden flex items-center justify-center py-1">
        <svg
          viewBox="0 0 1200 340"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block max-h-[390px]"
        >
          <defs>
            {/* Color-specific glow filters */}
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#29251F" floodOpacity="0.65" />
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#29251F" floodOpacity="0.65" />
            </filter>
            <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#29251F" floodOpacity="0.65" />
            </filter>
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#29251F" floodOpacity="0.65" />
            </filter>
            <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#29251F" floodOpacity="0.65" />
            </filter>

            {/* Linear Gradients for Connectors */}
            <linearGradient id="grad-project" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-design" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-frontend" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-backend" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-integration" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-testing" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            <linearGradient id="grad-completed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29251F" />
              <stop offset="100%" stopColor="#29251F" />
            </linearGradient>

            {/* Dot Grid Background */}
            <pattern id="wfGridMulti" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#6F675D" fillOpacity="0.10" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="1200" height="340" fill="url(#wfGridMulti)" rx="16" />

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
                      ? p.color === '#29251F'
                        ? 'url(#glow-pink)'
                        : p.color === '#29251F'
                        ? 'url(#glow-cyan)'
                        : p.color === '#29251F'
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
            fill="#29251F"
            className="transition-all duration-300"
          />
          {/* Convergence Point at Integration input (494, 170) */}
          <circle
            cx="494"
            cy="170"
            r={isFastScrolling ? 4.5 : 3.5}
            fill="#29251F"
            className="transition-all duration-300"
          />

          {/* 5. Parallel Branch Track Labels */}
        

          {/* 6. Larger Squarish Workflow Cards */}
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
                  className={`w-full h-full rounded-[14px] border flex flex-col justify-between p-3 cursor-pointer transition-all duration-200 ease-out ${
                    isHovered
                      ? `${node.hoverBorder} bg-[#FFFDF8] shadow-lg -translate-y-1 z-30`
                      : isConnected
                      ? `${node.hoverBorder} bg-[#F0E8DC] shadow-sm z-20`
                      : 'border-[#D6CCBD] bg-[#F5F0E6] shadow-sm hover:border-[#29251F]'
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
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        isHovered
                          ? 'bg-[#29251F] text-[#FFFDF8]'
                          : node.badgeBg
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Small Status Indicator */}
                    <div className="flex items-center gap-1">
                      {node.id === 'completed' ? (
                        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-[#FFFDF8] shadow-2xs">
                          <Check className="w-2.5 h-2.5 text-[#FFFDF8]" strokeWidth={3} />
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
                      className={`text-[13px] font-bold tracking-tight truncate leading-none ${
                        isHovered ? 'text-[#29251F]' : 'text-[#29251F]'
                      }`}
                    >
                      {node.title}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
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
      <div className="mt-1 pt-2 px-2 border-t border-[#D6CCBD] flex items-center justify-between text-[11px] text-[#6F675D]">
        {hoveredNode ? (
          <div className="flex items-center gap-2 animate-in fade-in duration-150">
            <span
              className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold text-white shadow-2xs"
              style={{ backgroundColor: hoveredNode.color }}
            >
              {hoveredNode.code}
            </span>
            <span className="font-bold text-[#29251F]">{hoveredNode.title} Stage:</span>
            <span className="text-[#6F675D]">{hoveredNode.subtitle}</span>
            <span className="text-[#8B8174]">({hoveredNode.metric})</span>
            <span className="hidden sm:inline text-[#A69B8D]">• Path illuminated</span>
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
