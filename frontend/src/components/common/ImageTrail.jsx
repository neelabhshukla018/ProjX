import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Default gallery images for ProjX / Vengeance UI ImageTrail
 * High-resolution architectural, design atelier, and product engineering compositions
 */
const DEFAULT_TRAIL_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    alt: 'Abstract sculptural form',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    alt: 'Minimal architectural geometry',
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    alt: 'High-velocity engineering atelier',
  },
  {
    src: 'https://images.unsplash.com/photo-1617643472854-39a9dcc34eee?auto=format&fit=crop&w=600&q=80',
    alt: 'Architectural concrete detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1549800076-831d7a97afac?auto=format&fit=crop&w=600&q=80',
    alt: 'Textured monochrome composition',
  },
  {
    src: 'https://images.unsplash.com/photo-1730750374142-557f2417db3a?auto=format&fit=crop&w=600&q=80',
    alt: 'Minimal design atelier study',
  },
  {
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    alt: 'Monochrome interior lines',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    alt: 'Fluid monochromatic dynamic',
  },
];

const DEFAULT_TRANSITION = {
  type: 'spring',
  stiffness: 260,
  damping: 22,
};

const DEFAULT_EXIT_TRANSITION = {
  duration: 0.4,
  ease: 'easeInOut',
};

const normalizeImage = (image) =>
  typeof image === 'string' ? { src: image, alt: '' } : image;

/**
 * ImageTrail Component
 * Official Vengeance UI Component (https://www.vengenceui.com/components/image-trail)
 * 
 * Creates a dynamic, fluid trail of rotating images that follow behind the user's cursor
 * with spring physics, momentum-aware distance thresholding, and exit transitions.
 */
export function ImageTrail({
  images = DEFAULT_TRAIL_IMAGES,
  threshold = 80,
  minDelay = 50,
  duration = 1000,
  maxItems = 8,
  rotationRange = 40,
  imageClassName,
  overlayClassName,
  transition = DEFAULT_TRANSITION,
  exitTransition = DEFAULT_EXIT_TRANSITION,
  disabled = false,
  desktopOnly = false,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  const [trail, setTrail] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const lastPositionRef = useRef(null);
  const lastTimeRef = useRef(0);
  const imageIndexRef = useRef(0);
  const timeoutRefs = useRef(new Set());

  useEffect(() => {
    if (!desktopOnly) return;
    const checkIsDesktop = () => {
      const hasFinePointer =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches;
      const isWideEnough =
        typeof window !== 'undefined' && window.innerWidth >= 768;
      setIsDesktop(Boolean(hasFinePointer && isWideEnough));
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, [desktopOnly]);

  const normalizedImages = useMemo(() => images.map(normalizeImage), [images]);
  const safeThreshold = Math.max(0, threshold);
  const safeMinDelay = Math.max(0, minDelay);
  const safeDuration = Math.max(0, duration);
  const safeMaxItems = Math.max(0, Math.floor(maxItems));
  const safeRotationRange = Math.max(0, rotationRange);

  useEffect(() => {
    const timeouts = timeoutRefs.current;

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);

  const removeItem = useCallback((id) => {
    setTrail((current) => current.filter((item) => item.id !== id));
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      onPointerMove?.(event);

      if (
        disabled ||
        (desktopOnly && !isDesktop) ||
        !normalizedImages.length ||
        safeMaxItems === 0
      ) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const lastPosition = lastPositionRef.current;
      const now = window.performance.now();

      if (lastPosition) {
        const distance = Math.hypot(position.x - lastPosition.x, position.y - lastPosition.y);

        if (distance < safeThreshold || now - lastTimeRef.current < safeMinDelay) {
          return;
        }
      }

      const image = normalizedImages[imageIndexRef.current % normalizedImages.length];
      const id = `${Math.round(now)}-${Math.random().toString(36).slice(2)}`;
      const rotation = Math.random() * safeRotationRange - safeRotationRange / 2;

      imageIndexRef.current = (imageIndexRef.current + 1) % normalizedImages.length;
      lastPositionRef.current = position;
      lastTimeRef.current = now;

      setTrail((current) => {
        const next = [
          ...current,
          {
            id,
            x: position.x,
            y: position.y,
            src: image.src,
            alt: image.alt ?? '',
            rotation,
          },
        ];

        return next.slice(Math.max(0, next.length - safeMaxItems));
      });

      const timeout = window.setTimeout(() => {
        timeoutRefs.current.delete(timeout);
        removeItem(id);
      }, safeDuration);
      timeoutRefs.current.add(timeout);
    },
    [
      disabled,
      desktopOnly,
      isDesktop,
      normalizedImages,
      onPointerMove,
      removeItem,
      safeDuration,
      safeMaxItems,
      safeMinDelay,
      safeRotationRange,
      safeThreshold,
    ]
  );

  const handlePointerLeave = useCallback(
    (event) => {
      lastPositionRef.current = null;
      onPointerLeave?.(event);
    },
    [onPointerLeave]
  );

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}

      {!disabled && (!desktopOnly || isDesktop) && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-40 overflow-hidden',
            overlayClassName
          )}
        >
          <AnimatePresence>
            {trail.map((item) => (
              <motion.div
                key={item.id}
                className="absolute pointer-events-none"
                style={{ left: item.x, top: item.y }}
                initial={{
                  x: '-50%',
                  y: '-50%',
                  scale: 0.82,
                  opacity: 0,
                  rotate: item.rotation,
                }}
                animate={{
                  x: '-50%',
                  y: '-50%',
                  scale: 1,
                  opacity: 1,
                  rotate: item.rotation,
                }}
                exit={{
                  x: '-50%',
                  y: '-50%',
                  scale: 0.5,
                  opacity: 0,
                  rotate: item.rotation * 0.75,
                  transition: exitTransition,
                }}
                transition={transition}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  className={cn(
                    'block aspect-[3/4] w-32 md:w-40 select-none rounded-lg object-cover shadow-2xl ring-1 ring-black/10',
                    imageClassName
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default ImageTrail;
