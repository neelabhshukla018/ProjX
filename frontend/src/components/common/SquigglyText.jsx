import React, { useState, useEffect, useId } from 'react';

/**
 * SquigglyText Component
 * Inspired by Aceternity UI (https://ui.aceternity.com/components/squiggly-text)
 * - Creates an organic, liquid-wobble squiggly text distortion effect using SVG turbulence & displacement filters
 * - Cycles dynamically through turbulence seed values to generate continuous hand-drawn wobble
 * - Customizable scale, frequency, steps, and duration
 * - Fully accessible and respects prefers-reduced-motion
 */
export const SquigglyText = ({
  children,
  steps = 5,
  stepDuration = 90,
  scale = [2.5, 4.5],
  baseFrequency = 0.02,
  numOctaves = 3,
  className = '',
  as: Component = 'span',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const reactId = useId();
  const filterId = `squiggly-filter-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [steps, stepDuration]);

  const currentScale = Array.isArray(scale)
    ? scale[currentStep % scale.length]
    : scale;

  return (
    <>
      {/* Hidden SVG Filter Definition */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0 }}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed={currentStep}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={currentScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Target Element with dynamic SVG filter */}
      <Component
        className={`inline ${className}`}
        style={{ filter: `url(#${filterId})` }}
      >
        {children}
      </Component>
    </>
  );
};

export default SquigglyText;
