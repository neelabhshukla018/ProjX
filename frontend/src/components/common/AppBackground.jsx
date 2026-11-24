import React from 'react';

/**
 * AppBackground (Non-grid luxury ambient background)
 * Replaces geometric grid lines with:
 * - Fluid organic Aurora ambient gradient meshes
 * - Floating soft light orbs with gentle animated drift
 * - High-end tactile paper/film grain texture overlay
 * - Spotlight glow under the 3D floating navbar
 * ZERO grid lines or geometric boxes.
 */
export const AppBackground = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen w-full bg-[#F3F4F6] text-[#0F0F0F] overflow-x-hidden ${className}`}>
      {/* Fixed Ambient Background Layers (Zero Grid) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* 1. Base Canvas */}
        <div className="absolute inset-0 bg-[#F5F5F7]" />

        {/* 2. Ambient Aurora Orb 1: Top-center luminous halo behind floating navbar */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[950px] h-[550px] rounded-full blur-[110px] pointer-events-none opacity-85"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(210, 218, 232, 0.8) 0%, rgba(228, 234, 245, 0.45) 45%, transparent 75%)',
          }}
        />

        {/* 3. Ambient Aurora Orb 2: Top-left drifting graphite-slate aura */}
        <div
          className="absolute top-1/4 -left-48 w-[700px] h-[700px] rounded-full blur-[130px] pointer-events-none opacity-65 animate-pulse"
          style={{
            animationDuration: '9s',
            background: 'radial-gradient(circle at center, rgba(195, 208, 225, 0.65) 0%, rgba(218, 226, 238, 0.3) 50%, transparent 80%)',
          }}
        />

        {/* 4. Ambient Aurora Orb 3: Right-side warm stone-silver depth aura */}
        <div
          className="absolute top-1/2 -right-48 w-[750px] h-[750px] rounded-full blur-[140px] pointer-events-none opacity-70 animate-pulse"
          style={{
            animationDuration: '11s',
            background: 'radial-gradient(circle at center, rgba(215, 218, 228, 0.65) 0%, rgba(232, 234, 242, 0.35) 50%, transparent 80%)',
          }}
        />

        {/* 5. Ambient Aurora Orb 4: Bottom-left subtle anchor glow */}
        <div
          className="absolute -bottom-36 left-1/4 w-[850px] h-[650px] rounded-full blur-[130px] pointer-events-none opacity-55"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(218, 224, 236, 0.55) 0%, rgba(238, 242, 248, 0.25) 50%, transparent 75%)',
          }}
        />

        {/* 6. Tactile Fine Film-Grain Noise Texture Layer (No grid lines whatsoever) */}
        <div
          className="absolute inset-0 opacity-[0.055] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 7. Soft Vignette along viewport boundaries */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.035) 100%)',
          }}
        />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AppBackground;
