import type { DialogProps } from '../../types/components';
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, Overlay } from '../atoms';
import { useScrollLock, useFocusTrap, useClickOutside } from '../../hooks';

export const Dialog: React.FC<DialogProps> = ({
  ScrollLock = true,
  isOpen,
  title,
  description,
  icon,
  size = 'md',
  children,
  buttons,
  onClose,
  openedByClick = false,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = `dialog-title-${React.useId()}`;
  const descriptionId = description
    ? `dialog-description-${React.useId()}`
    : undefined;

  if (ScrollLock) useScrollLock(isOpen);
  useFocusTrap(isOpen, dialogRef, openedByClick);

  const sizeClasses = {
    sm: 'max-w-[90vw] sm:max-w-sm',
    md: 'max-w-[90vw] sm:max-w-md',
    lg: 'max-w-[90vw] sm:max-w-lg',
    xl: 'max-w-[90vw] sm:max-w-xl',
  };

  const handleClose = () => {
    if (buttons?.cancel?.onClick) {
      buttons.cancel.onClick();
    }
    if (onClose) {
      onClose();
    }
  };

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  useClickOutside(dialogRef, handleClose);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
        <div
          ref={dialogRef}
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
              <div>
                <h2
                  id={titleId}
                  className="text-ember-50 text-base font-semibold sm:text-lg md:text-xl"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={descriptionId}
                    className="text-charcoal-300 mt-1 text-xs sm:text-sm"
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="xs"
              startIcon={
                <X className="text-charcoal-200 h-4 w-4 sm:h-5 sm:w-5" />
              }
              onClick={handleClose}
              aria-label="Close cart"
              className="p-2"
            />
          </div>

          {/* ---------- Body with Custom Scrollbar ---------- */}
          <div className="custom-scroll-y flex-1 p-4 sm:p-6">{children}</div>

          {/* ---------- Footer with Buttons ---------- */}
          {buttons && (
            <div className="border-charcoal-700/50 flex items-center justify-end gap-2 border-t p-4 sm:gap-3 sm:p-6">
              {buttons.cancel && (
                <Button
                  text={buttons.cancel.text}
                  variant="secondary"
                  size="sm"
                  onClick={handleClose}
                  {...buttons.cancel.props}
                />
              )}
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
          )}
        </div>
      </div>
    </Overlay>
  );
};
