import React from 'react';

/**
 * GradientBars Component
 * Inspired by @waleedkibhen/components/gradient-bars-background on 21st.dev
 *
 * Renders animated vertical gradient bars with a V-shaped profile and subtle pulsing animation.
 * Features customizable colors, responsive bar counts, and soft ambient shades suitable
 * for light and monochrome landing page backgrounds without altering core content contrast.
 */
export const GradientBars = ({
  numBars = 15,
  gradientFrom = 'rgba(255, 60, 0, 0.16)',
  gradientTo = 'transparent',
  animationDuration = 2.6,
  minHeight = 45,
  maxHeight = 100,
  barBorderColor = 'rgba(255, 60, 0, 0.05)',
  className = '',
}) => {
  // Calculates height percentage to produce the characteristic V-shape
  // Shorter in the center to preserve text legibility, taller on the outer edges
  const calculateHeight = (index, total) => {
    if (total <= 1) return maxHeight;
    const norm = index / (total - 1);
    const distFromCenter = Math.abs(norm - 0.5);
    const factor = Math.pow(distFromCenter * 2, 1.2);
    return minHeight + (maxHeight - minHeight) * factor;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% {
            transform: scaleY(var(--initial-scale));
          }
          100% {
            transform: scaleY(calc(var(--initial-scale) * 0.72));
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="flex h-full w-full"
          style={{
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const heightPercent = calculateHeight(index, numBars);
            const scale = heightPercent / 100;

            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${scale})`,
                  transformOrigin: 'bottom',
                  transition: 'transform 0.5s ease-in-out',
                  animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.1}s`,
                  borderRight: index < numBars - 1 ? `1px solid ${barBorderColor}` : 'none',
                  borderLeft: index === 0 ? `1px solid ${barBorderColor}` : 'none',
                  boxSizing: 'border-box',
                  '--initial-scale': scale,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GradientBars;
