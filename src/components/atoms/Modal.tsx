import type { FC, ModalProps } from '@/types';
import React, { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button, Overlay } from '@/components/atoms';
import { useClickOutside, useFocusTrap, useScrollLock } from '@/hooks';

export const Modal: FC<ModalProps> = ({
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

  const handleCancelClick = useCallback(() => {
    if (buttons.cancel.onClick) {
      buttons.cancel.onClick();
    }
  }, [buttons]);

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
  }, [isOpen, handleCancelClick]);

  useScrollLock({ isActive: isOpen });
  useFocusTrap({ isActive: isOpen, ref: modalRef, openedByClick });
  useClickOutside({ ref: modalRef, callback: handleCancelClick });

  if (!isOpen) return null;

  const sizeClasses = {
    xs: 'max-w-[90vw] sm:max-w-xs',
    sm: 'max-w-[90vw] sm:max-w-sm',
    md: 'max-w-[90vw] sm:max-w-md',
    lg: 'max-w-[90vw] sm:max-w-lg',
    xl: 'max-w-[90vw] sm:max-w-xl',
  };

  return (
    <>
      <Overlay isOpen={isOpen} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
        <div
          ref={modalRef}
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal="true"
          className={`relative w-full ${sizeClasses[size]} bg-gradient-charcoal border-ember-600/30 mx-auto flex max-h-[90vh] flex-col rounded-xl border shadow-2xl backdrop-blur-xl`}
          role="dialog"
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
                className="text-ember-50 text-base font-semibold sm:text-lg md:text-xl"
                id={titleId}
              >
                {title}
              </h2>
            </div>
            <button
              aria-label="Close modal"
              className="text-charcoal-300 hover:text-charcoal-200 hover:bg-charcoal-700 focus:ring-ember-300 ember-transition cursor-pointer rounded-lg p-1.5 focus-visible:ring-2 sm:p-2"
              onClick={handleCancelClick}
              type="button"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* ---------- Body ---------- */}
          <div className="custom-scroll-y flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
            <p
              className="text-charcoal-200 text-xs leading-relaxed sm:text-sm"
              id={descriptionId}
            >
              {message}
            </p>
          </div>

          {/* ---------- Footer with Buttons ---------- */}
          <div className="border-charcoal-700/50 flex items-center justify-end gap-2 border-t p-4 sm:gap-3 sm:p-6">
            <Button
              onClick={handleCancelClick}
              size="sm"
              text={buttons.cancel.text}
              variant="secondary"
            />
            {buttons.confirm && (
              <Button
                onClick={buttons.confirm.onClick}
                size="sm"
                text={buttons.confirm.text}
                variant="primary"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
