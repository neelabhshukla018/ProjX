import React, { useState } from 'react';

// Authentic crisp inline SVGs for all technologies
const NextjsLogo = () => (
  <svg viewBox="0 0 180 180" className="w-6 h-6" fill="none">
    <mask id="nextMask" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#nextMask)">
      <circle cx="90" cy="90" r="90" fill="#0F0F0F" stroke="#2C2C2C" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#nextGrad)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#nextGrad2)" />
    </g>
    <defs>
      <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nextGrad2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#087EA4" />
    <g stroke="#087EA4" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#38BDF8">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3178C6">
    <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.284 15.625c-.098-.184-.24-.34-.424-.467-.185-.126-.412-.229-.68-.308a7.227 7.227 0 0 0-.909-.187c-.33-.046-.667-.097-1.011-.154a8.214 8.214 0 0 1-1.082-.26 3.018 3.018 0 0 1-.98-.535 2.155 2.155 0 0 1-.628-.887c-.146-.37-.22-.816-.22-1.34 0-.584.12-1.096.359-1.536.239-.44.57-.803.993-1.089.423-.286.924-.496 1.503-.63.58-.135 1.206-.202 1.88-.202.636 0 1.234.068 1.794.204.56.136 1.05.344 1.47.625.42.28.756.636 1.008 1.067.252.43.385.94.398 1.528l-2.736.31c-.025-.39-.145-.717-.36-.98-.216-.263-.562-.395-1.038-.395-.44 0-.785.105-1.034.316-.25.21-.374.496-.374.858 0 .285.093.518.28.698.186.18.453.33.8.448.347.119.742.222 1.185.31.443.087.9.186 1.37.297.514.118.986.284 1.417.498.43.214.793.488 1.089.822.296.334.517.733.664 1.197.146.464.22.998.22 1.603 0 .61-.118 1.157-.354 1.64a3.834 3.834 0 0 1-.99 1.258 4.792 4.792 0 0 1-1.52.81c-.598.19-1.26.285-1.986.285-.724 0-1.415-.084-2.073-.252a5.794 5.794 0 0 1-1.748-.748 4.095 4.095 0 0 1-1.228-1.258c-.287-.52-.44-1.127-.46-1.821l2.766-.31c.04.472.19.852.451 1.14.26.288.66.432 1.2.432.485 0 .867-.11 1.145-.33.279-.22.418-.528.418-.924 0-.324-.108-.588-.324-.792zm-9.356 2.05h3.045V7.938H9.375V5.5h8.922v2.438h-3.084v9.737H12.17V7.938z" />
  </svg>
);

const ViteLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6">
    <path
      fill="url(#viteGrad)"
      d="M29.98 5.75L16.7 29.5a1.2 1.2 0 01-2.12-.04L2.02 5.76a1.2 1.2 0 011.02-1.76h25.92a1.2 1.2 0 011.02 1.75z"
    />
    <path
      fill="#FFD62E"
      d="M18.8 3.8L8.6 15.6a.6.6 0 00.5 1h5.8l-1.9 8.6a.6.6 0 001 .5l9.8-11.8a.6.6 0 00-.5-1h-5.9l2-9a.6.6 0 00-.7-.9z"
    />
    <defs>
      <linearGradient id="viteGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41D1FF" />
        <stop offset="1" stopColor="#BD34FE" />
      </linearGradient>
    </defs>
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#5FA04E">
    <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
    <path d="M12 6.5l5.5 3.2v4.6l-5.5 3.2-5.5-3.2V9.7L12 6.5z" opacity="0.3" />
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#336791">
    <path d="M12.002 2c-5.523 0-10 4.477-10 10 0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2496ED">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.575a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.084.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.084.185.185.185m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0 2.714h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.084.185.185.185m-2.955 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m8.863 2.716h2.118a.186.186 0 00.186-.186V11.72a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.887c0 .103.084.186.186.186m-2.954 0h2.119a.186.186 0 00.185-.186V11.72a.185.185 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .103.083.186.185.186m-2.954 0h2.119a.185.185 0 00.185-.186V11.72a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .103.084.186.185.186m15.574-.757c-.311-.202-1.018-.321-1.638-.17-.184-.539-.54-1.002-1.018-1.317-.611-.403-1.428-.488-2.227-.324l-.19.04a.276.276 0 01-.274-.087c-.649-.785-1.597-1.31-2.617-1.464-.17-.026-.299.117-.299.288v2.164a.278.278 0 01-.277.278H.794a.794.794 0 00-.794.794c0 3.86 2.072 7.086 5.86 7.643 3.787.558 8.04.148 11.233-2.637 2.115-1.846 3.167-3.955 3.584-5.208z" />
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#DC382D">
    <path d="M21.56 7.44l-8.7-5.02a1.72 1.72 0 00-1.72 0l-8.7 5.02a1.73 1.73 0 00-.86 1.5v10.05c0 .62.33 1.19.86 1.5l8.7 5.02c.53.31 1.19.31 1.72 0l8.7-5.02c.53-.31.86-.88.86-1.5V8.94c0-.62-.33-1.19-.86-1.5zM12 4.08l6.83 3.94-2.83 1.63L9.17 5.71 12 4.08zM4.73 8.94L11 12.56v6.94l-6.27-3.62V8.94zm8.27 10.56v-6.94l6.27-3.62v6.94l-6.27 3.62z" />
  </svg>
);

const FramerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0055FF">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const GraphQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E10098">
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L4.84 8.5v7l7.16 4.2 7.16-4.2v-7L12 4.3z" />
    <circle cx="12" cy="2" r="1.5" />
    <circle cx="20.66" cy="7" r="1.5" />
    <circle cx="20.66" cy="17" r="1.5" />
    <circle cx="12" cy="22" r="1.5" />
    <circle cx="3.34" cy="17" r="1.5" />
    <circle cx="3.34" cy="7" r="1.5" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#3776AB"
      d="M11.91 2c-5.06 0-4.74 2.19-4.74 2.19l.01 2.27h4.82v.69H5.16S2 6.8 2 11.93s2.76 4.96 2.76 4.96h1.65v-2.32s-.09-2.76 2.71-2.76h4.66s2.63.04 2.63-2.55V4.64s.38-2.64-4.5-2.64zm-2.6 1.48a.86.86 0 110 1.72.86.86 0 010-1.72z"
    />
    <path
      fill="#FFD438"
      d="M12.09 22c5.06 0 4.74-2.19 4.74-2.19l-.01-2.27h-4.82v-.69h6.84S22 17.2 22 12.07s-2.76-4.96-2.76-4.96h-1.65v2.32s.09 2.76-2.71 2.76H10.22s-2.63-.04-2.63 2.55v4.61s-.38 2.65 4.5 2.65zm2.6-1.48a.86.86 0 110-1.72.86.86 0 010 1.72z"
    />
  </svg>
);

const PrismaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2D3748">
    <path d="M19.99 18.7L12.92 2.28a1.05 1.05 0 00-1.84 0L4.01 18.7a1.05 1.05 0 00.92 1.52h14.14a1.05 1.05 0 00.92-1.52zM12 5.34l5.3 12.38H6.7L12 5.34z" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path
      d="M13.4 2.2a1 1 0 00-1.4.1L3.3 12.8a1 1 0 00.8 1.6h7.5l-1 7.4a1 1 0 001.7.7l8.7-10.5a1 1 0 00-.8-1.6h-7.5l1-7.4a1 1 0 00-.3-.8z"
      fill="#3ECF8E"
    />
  </svg>
);

const RechartsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <rect x="2" y="14" width="4" height="7" rx="1" fill="#22C55E" />
    <rect x="8.5" y="9" width="4" height="12" rx="1" fill="#0EA5E9" />
    <rect x="15" y="4" width="4" height="17" rx="1" fill="#6366F1" />
  </svg>
);

const LucideLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

// Minimalist Logo Item - No card, no border, no background box
const LogoItem = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-2 shrink-0 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-pointer group">
    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
      <Icon />
    </div>
    <span className="text-sm sm:text-base font-bold text-[#3A3A3A] group-hover:text-[#0F0F0F] tracking-tight whitespace-nowrap transition-colors">
      {name}
    </span>
  </div>
);

/**
 * TechnologiesSection Component
 * Pure background dual-direction running belt with no cards or container boxes:
 * - Line 1: Moves LEFT continuously
 * - Line 2: Moves RIGHT continuously
 * Directly in the landing page background with seamless edge gradient fades.
 */
export const TechnologiesSection = () => {
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  // Row 1: Frontend, UI & Styling Stack (Moves LEFT)
  const row1Logos = [
    { icon: NextjsLogo, name: 'Next.js' },
    { icon: ReactLogo, name: 'React.js' },
    { icon: TailwindLogo, name: 'Tailwind CSS' },
    { icon: TypeScriptLogo, name: 'TypeScript' },
    { icon: ViteLogo, name: 'Vite' },
    { icon: FramerLogo, name: 'Framer Motion' },
    { icon: RechartsLogo, name: 'Recharts' },
    { icon: LucideLogo, name: 'Lucide' },
  ];

  // Row 2: Backend, Databases & Infrastructure Stack (Moves RIGHT)
  const row2Logos = [
    { icon: NodeLogo, name: 'Node.js' },
    { icon: PostgresLogo, name: 'PostgreSQL' },
    { icon: DockerLogo, name: 'Docker' },
    { icon: RedisLogo, name: 'Redis' },
    { icon: GraphQLLogo, name: 'GraphQL' },
    { icon: PythonLogo, name: 'Python' },
    { icon: PrismaLogo, name: 'Prisma' },
    { icon: SupabaseLogo, name: 'Supabase' },
  ];

  // Duplicated for seamless gapless loop
  const repeatedRow1 = [...row1Logos, ...row1Logos, ...row1Logos];
  const repeatedRow2 = [...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <div id="technologies" className="relative w-full overflow-hidden py-10 sm:py-14 select-none">
      {/* Subtle eyebrow label directly in background */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8E8E8E]">
          Technologies & Architecture We Used
        </p>
      </div>

      {/* Left and Right Edge Fade Gradients into Page Background (#F5F5F5) */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-40 md:w-56 z-20 bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-40 md:w-56 z-20 bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />

      {/* Dual Running Belts (No Cards, No Containers) */}
      <div className="space-y-4 sm:space-y-6">
        {/* Line 1: Goes LEFT */}
        <div
          className="flex w-max items-center will-change-transform"
          style={{
            animation: 'beltSlideLeft 32s linear infinite',
            animationPlayState: isPausedRow1 ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsPausedRow1(true)}
          onMouseLeave={() => setIsPausedRow1(false)}
        >
          {repeatedRow1.map((item, idx) => (
            <LogoItem key={`r1-${idx}`} icon={item.icon} name={item.name} />
          ))}
        </div>

        {/* Line 2: Goes RIGHT */}
        <div
          className="flex w-max items-center will-change-transform"
          style={{
            animation: 'beltSlideRight 34s linear infinite',
            animationPlayState: isPausedRow2 ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsPausedRow2(true)}
          onMouseLeave={() => setIsPausedRow2(false)}
        >
          {repeatedRow2.map((item, idx) => (
            <LogoItem key={`r2-${idx}`} icon={item.icon} name={item.name} />
          ))}
        </div>
      </div>

      {/* Hardware-Accelerated Keyframe Styles */}
      <style>{`
        @keyframes beltSlideLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        @keyframes beltSlideRight {
          0% {
            transform: translateX(-33.333333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default TechnologiesSection;
