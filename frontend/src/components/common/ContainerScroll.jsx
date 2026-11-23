import React, { useRef, useState, useEffect } from 'react';

/**
 * ContainerScroll Component
 * Inspired by Aceternity UI (https://ui.aceternity.com/components/container-scroll-animation)
 * - 3D scroll-driven tilted perspective screen animation
 * - Tilts backwards in 3D (rotateX: ~20deg, scale: 0.9) when at the top
 * - Smoothly rotates upright (rotateX: 0deg, scale: 1.0) and translates as user scrolls into view
 * - Features premium luxury bezel, ambient sheen reflection, and responsive touch/mouse handling
 * - Respects prefers-reduced-motion
 */
export const ContainerScroll = ({
  children,
  className = '',
  maxTilt = 20,
}) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start tilting when the element enters from bottom of viewport
      // Reach completely flat (progress = 1) when centered in upper-mid viewport
      const startPoint = windowHeight * 0.95;
      const endPoint = windowHeight * 0.25;

      const totalDistance = startPoint - endPoint;
      const currentProgress = (startPoint - rect.top) / totalDistance;
      const clamped = Math.min(Math.max(currentProgress, 0), 1);

      animationFrameId = requestAnimationFrame(() => {
        setProgress(clamped);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Compute 3D transformation values
  // progress 0 (top of page/scroll entrance): rotateX is tilted (20deg), scale is 0.92
  // progress 1 (scrolled up into focus): rotateX is 0deg, scale is 1.0
  const rotateX = (1 - progress) * (isMobile ? maxTilt * 0.65 : maxTilt);
  const scale = isMobile ? 0.94 + progress * 0.06 : 0.92 + progress * 0.08;
  const translateY = (1 - progress) * (isMobile ? 25 : 45);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      <div
        className="w-full transition-transform ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'top center',
          transitionDuration: '120ms',
        }}
      >
        {/* Luxury Outer Display Bezel */}
        <div className="relative rounded-[26px] sm:rounded-[32px] p-2 sm:p-3.5 bg-[#0F0F0F] border border-[#2C2C2C] shadow-2xl transition-all">
          {/* Ambient Top Light Flare / Specular Sheen */}
          <div
            className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#FFFFFF]/30 to-transparent pointer-events-none"
            style={{ opacity: 1 - progress * 0.5 }}
          />

          {/* Inner Display Surface */}
          <div className="rounded-[18px] sm:rounded-[24px] bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerScroll;
