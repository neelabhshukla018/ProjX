import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { modalEntrance } from '../../utils/animations';

/**
 * Pure Monochrome Modal Component
 * - Pure white background (#FFFFFF)
 * - Restrained elevated shadow
 * - Full responsive containment: adapts to short mobile screens with internal scroll
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  showClose = true,
}) => {
  const modalRef = useRef(null);
  const prevOpenRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Run entrance animation strictly once on open transition
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalEntrance(modalRef.current);
      }
    } else if (!isOpen && prevOpenRef.current) {
      document.body.style.overflow = 'unset';
    }
    prevOpenRef.current = isOpen;

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key without causing modal re-animating/blinking on keystrokes
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F0F0F]/60 transition-opacity duration-200"
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${maxWidth} max-h-[92vh] flex flex-col bg-[#FFFFFF] rounded-xl shadow-dropdown border border-[#E5E5E5]
          overflow-hidden z-10 transition-transform my-auto
        `}
      >
        {(title || showClose) && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#EFEFEF] flex items-center justify-between shrink-0">
            <div className="pr-4">
              {title && (
                <h3 className="text-base sm:text-lg font-semibold text-[#0F0F0F] tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#5A5A5A] mt-0.5 line-clamp-1">{subtitle}</p>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-[#5A5A5A] hover:text-[#0F0F0F] p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
