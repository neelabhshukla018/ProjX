import React, { useState, useEffect, useMemo } from 'react';

/**
 * FlipText Component
 * Inspired by Vengeance UI (https://www.vengenceui.com/components/flip-text)
 * - 3D character-level split-flap flipping animation
 * - Staggered cascade across words & characters
 * - Supports single text strings or word cycling array
 * - Supports duration, delay, loop, and interactive hover triggering
 * - Pure monochrome luxury styling (#0F0F0F / #FFFFFF)
 */
export const FlipText = ({
  children,
  words,
  className = '',
  duration = 2.4,
  delay = 0,
  loop = true,
  separator = ' ',
  staggerDelay = 0.035,
}) => {
  // If words array is provided, cycle through words; otherwise animate children string
  const wordList = words && words.length > 0 ? words : [children || ''];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'hold' | 'out'

  const currentText = wordList[currentWordIndex] || '';

  useEffect(() => {
    let timer;
    if (phase === 'in') {
      // Hold after all characters have completed entrance flip
      const totalInTime = currentText.length * staggerDelay * 1000 + 420;
      timer = setTimeout(() => {
        setPhase('hold');
      }, totalInTime);
    } else if (phase === 'hold') {
      if (loop || wordList.length > 1) {
        timer = setTimeout(() => {
          setPhase('out');
        }, duration * 1000);
      }
    } else if (phase === 'out') {
      // Transition to next word after exit flip completes
      const totalOutTime = currentText.length * staggerDelay * 1000 + 380;
      timer = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % wordList.length);
        setPhase('in');
      }, totalOutTime);
    }

    return () => clearTimeout(timer);
  }, [phase, currentText, duration, loop, wordList.length, staggerDelay]);

  const handleMouseEnter = () => {
    if (phase === 'hold') {
      setPhase('out');
    }
  };

  // Precompute word tokens and character index offsets via pure iteration to keep render immutable
  const wordTokens = useMemo(() => {
    const words = currentText.split(separator);
    const tokens = [];
    let running = 0;
    for (let i = 0; i < words.length; i += 1) {
      const w = words[i];
      tokens.push({
        word: w,
        startIdx: running,
        letters: w.split(''),
      });
      running += w.length + separator.length;
    }
    return tokens;
  }, [currentText, separator]);

  return (
    <span
      className={`inline-block perspective-1000 cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={currentText}
    >
      {wordTokens.map((item, wIdx) => {
        const wordElement = (
          <span key={`word-${wIdx}-${currentWordIndex}`} className="inline-block whitespace-nowrap">
            {item.letters.map((char, cIdx) => {
              const charIdx = item.startIdx + cIdx;
              const charDelay = `${delay + charIdx * staggerDelay}s`;

              let animationStyle = {};
              if (phase === 'in') {
                animationStyle = {
                  animation: `flipIn 420ms cubic-bezier(0.2, 0.8, 0.2, 1) ${charDelay} both`,
                };
              } else if (phase === 'hold') {
                animationStyle = {
                  transform: 'rotateX(0deg) translateY(0)',
                  opacity: 1,
                };
              } else if (phase === 'out') {
                animationStyle = {
                  animation: `flipOut 380ms cubic-bezier(0.4, 0, 0.8, 0.2) ${charDelay} both`,
                };
              }

              return (
                <span
                  key={`char-${charIdx}-${char}`}
                  className="inline-block transform-gpu will-change-transform"
                  style={{
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    ...animationStyle,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );

        return (
          <React.Fragment key={`frag-${wIdx}-${currentWordIndex}`}>
            {wordElement}
            {wIdx < wordTokens.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default FlipText;
