import React, { useRef, useState } from 'react';

/**
 * StackedLogos Component
 * Inspired by Vengeance UI (https://www.vengenceui.com/components/stacked-logos)
 * 
 * Supports:
 * - `logoGroups`: React.ReactNode[][] (2D array of logo items, each inner array is a stacked column)
 * - `duration`: Animation cycle duration in seconds (default 30)
 * - `stagger`: Delay/offset between column animations
 * - `logoWidth`: Width allocated for each logo column (default '240px')
 * - `format`: 'belt' (infinite horizontal running belt) | 'columns' (vertical scrolling columns) | 'dual-belt'
 * - `direction`: 'left' | 'right' (for running belt format)
 * - `pauseOnHover`: Pause running belt on card hover (default true)
 * - `showGradientMask`: Edge fade gradient for seamless infinite look (default true)
 * - `className`: Custom container classes
 */
export const StackedLogos = ({
  logoGroups = [],
  duration = 32,
  stagger = 0,
  logoWidth = '240px',
  format = 'belt', // 'belt' | 'columns' | 'dual-belt'
  direction = 'left',
  pauseOnHover = true,
  showGradientMask = true,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  if (!logoGroups || logoGroups.length === 0) {
    return null;
  }

  // Multiply groups to ensure seamless infinite looping without gaps
  const repeatedGroups = [...logoGroups, ...logoGroups, ...logoGroups];

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Horizontal Running Belt Format (Marquee of Stacked Columns)
  if (format === 'belt' || format === 'dual-belt') {
    return (
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden select-none py-4 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left and Right Fade Gradients */}
        {showGradientMask && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-20 bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-20 bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
          </>
        )}

        <div
          className="flex w-max items-center gap-4 sm:gap-6 will-change-transform"
          style={{
            animation: `marqueeSlide${direction === 'right' ? 'Right' : 'Left'} ${duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {repeatedGroups.map((group, groupIndex) => {
            const columnIndex = groupIndex % logoGroups.length;
            const staggerDelay = stagger ? `${(columnIndex * stagger).toFixed(2)}s` : '0s';

            return (
              <div
                key={`group-${groupIndex}`}
                className="flex flex-col gap-3.5 sm:gap-4 shrink-0 transition-transform duration-300"
                style={{
                  width: logoWidth,
                  transitionDelay: staggerDelay,
                }}
              >
                {group.map((logoItem, itemIndex) => (
                  <div
                    key={`item-${groupIndex}-${itemIndex}`}
                    className="transform-gpu transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    {logoItem}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Global Keyframe Styles for Marquee */}
        <style>{`
          @keyframes marqueeSlideLeft {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-33.333333%);
            }
          }
          @keyframes marqueeSlideRight {
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
  }

  // Vertical Columns Format (Standard Vengeance UI Multi-Column Vertical Stacks)
  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none py-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top and Bottom Fade Gradients */}
      {showGradientMask && (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-16 sm:h-24 z-20 bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 sm:h-24 z-20 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
        </>
      )}

      <div className="flex justify-center gap-4 sm:gap-6 max-h-[500px] overflow-hidden">
        {logoGroups.map((group, colIndex) => {
          const isReverse = colIndex % 2 === 1;
          const colDuration = duration * (1 + (colIndex % 3) * 0.15);

          return (
            <div
              key={`col-${colIndex}`}
              className="flex flex-col gap-4 overflow-hidden"
              style={{ width: logoWidth }}
            >
              <div
                className="flex flex-col gap-4 will-change-transform"
                style={{
                  animation: `colSlide${isReverse ? 'Down' : 'Up'} ${colDuration}s linear infinite`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                  animationDelay: `${colIndex * (stagger || 0.4)}s`,
                }}
              >
                {[...group, ...group, ...group, ...group].map((item, itemIdx) => (
                  <div
                    key={`vitem-${colIndex}-${itemIdx}`}
                    className="transform-gpu transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes colSlideUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes colSlideDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default StackedLogos;
