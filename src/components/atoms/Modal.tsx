import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import Overlay from './Overlay';
import { useClickOutside } from '../../hooks/useClickOutside';
import useScrollLock from '../../hooks/useScrollLock';
import useFocusTrap from '../../hooks/useFocusTrap';
import type { ModalProps } from '../../types/components/Modal';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  icon,
  size = 'md',
  buttons,
  openedByClick = false,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const titleId = `modal-title-${React.useId()}`;
  const descriptionId = `modal-description-${React.useId()}`;

  // Lock browser scroll and trap focus when modal is open
  useScrollLock(isOpen);
  useFocusTrap(isOpen, modalRef, openedByClick);

  const handleCancelClick = () => {
    if (buttons.cancel.onClick) {
      buttons.cancel.onClick();
    }
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancelClick();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  useClickOutside(modalRef, handleCancelClick);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-[90vw] sm:max-w-sm',
    md: 'max-w-[90vw] sm:max-w-md',
    lg: 'max-w-[90vw] sm:max-w-lg',
    xl: 'max-w-[90vw] sm:max-w-xl',
  };

  return (
    <Overlay isOpen={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={`relative w-full ${sizeClasses[size]} bg-gradient-charcoal border-ember-600/30 mx-auto flex max-h-[90vh] flex-col rounded-xl border shadow-2xl backdrop-blur-xl`}
        >
          {/* ---------- Header ---------- */}
          <div className="border-charcoal-700/50 flex items-center justify-between border-b p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              {icon && (
                <div className="flex items-center rounded-lg p-1.5 sm:p-2">
                  <div className="text-ember-400 h-4 w-4 sm:h-5 sm:w-5">
                    {icon}
                  </div>
                </div>
              )}
              <h2
                id={titleId}
                className="text-ember-50 text-base font-semibold sm:text-lg md:text-xl"
              >
                {title}
              </h2>
            </div>
            <button
              type="button"
              className="text-charcoal-300 hover:text-charcoal-200 hover:bg-charcoal-700 focus:ring-ember-300 ember-transition cursor-pointer rounded-lg p-1.5 focus-visible:ring-2 sm:p-2"
              aria-label="Close modal"
              onClick={handleCancelClick}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* ---------- Body ---------- */}
          <div className="custom-scroll-y flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
            <p
              id={descriptionId}
              className="text-charcoal-200 text-xs leading-relaxed sm:text-sm"
            >
              {message}
            </p>
          </div>

          {/* ---------- Footer with Buttons ---------- */}
          <div className="border-charcoal-700/50 flex items-center justify-end gap-2 border-t p-4 sm:gap-3 sm:p-6">
            <Button
              text={buttons.cancel.text}
              variant="secondary"
              size="sm"
              onClick={handleCancelClick}
              {...buttons.cancel.props}
            />
            {buttons.confirm && (
              <Button
                text={buttons.confirm.text}
                variant="primary"
                size="sm"
                onClick={buttons.confirm.onClick}
                {...buttons.confirm.props}
              />
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Modal;
