import React from 'react';

/**
 * GradientBars Component
 * Inspired by @waleedkibhen/components/gradient-bars-background on 21st.dev
 *
 * Renders animated vertical gradient bars with a deep V-shaped profile and subtle pulsing animation.
 * The center bars stay low and faded to keep the center headline and content clean,
 * while the left and right flank bars rise all the way to the top.
 */
export const GradientBars = ({
  numBars = 15,
  gradientFrom = 'rgba(255, 60, 0, 0.18)',
  gradientTo = 'rgba(255, 60, 0, 0.075)',
  animationDuration = 2.6,
  minHeight = 32,
  maxHeight = 100,
  barBorderColor = 'rgba(255, 60, 0, 0.045)',
  className = '',
}) => {
  // Calculates height percentage to produce the steep V-shape:
  // Center is faded and low (~28%), while left & right flanks reach full height (100%)
  const calculateHeight = (index, total) => {
    if (total <= 1) return maxHeight;
    const norm = index / (total - 1);
    const distFromCenter = Math.abs(norm - 0.5) * 2; // 0 at center, 1 at edges
    const curve = Math.pow(distFromCenter, 1.4); // Smooth steep curve towards flanks
    return {
      heightPercent: minHeight + (maxHeight - minHeight) * curve,
      distFromCenter,
      curve,
    };
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% {
            transform: scaleY(var(--initial-scale));
          }
          100% {
            transform: scaleY(calc(var(--initial-scale) * 0.92));
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
            const { heightPercent, curve } = calculateHeight(index, numBars);
            const scale = heightPercent / 100;

            // Only outer left and right flanks retain the visible shade at the top
            // Center bars fade out smoothly to transparent
            const barGradientTo =
              curve > 0.15 ? gradientTo : 'transparent';

            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to top, ${gradientFrom} 0%, rgba(255, 60, 0, ${(0.095 * curve).toFixed(3)}) 55%, ${barGradientTo} 100%)`,
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
