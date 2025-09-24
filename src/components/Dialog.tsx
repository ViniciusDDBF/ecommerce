import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import type { ButtonProps } from './Button';
import Overlay from './Overlay';
import { useClickOutside } from '../hooks/useClickOutside';
import useScrollLock from '../hooks/useScrollLock';
import useFocusTrap from '../hooks/useFocusTrap';

type DialogProps = {
  ScrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  buttons?: {
    cancel?: {
      text: string;
      onClick?: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
    confirm?: {
      text: string;
      onClick?: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
  };
  onClose?: () => void;
  openedByClick?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
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

if (ScrollLock)
  useScrollLock(isOpen);
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
          {/* Header */}
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

            <button
              type="button"
              className="text-charcoal-300 hover:text-charcoal-200 hover:bg-charcoal-700 focus:ring-ember-300 ember-transition cursor-pointer rounded-lg p-1.5 focus-visible:ring-2 sm:p-2"
              aria-label="Close dialog"
              onClick={handleClose}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Body with Custom Scrollbar */}
          <div className="scrollbar-hide [&::-webkit-scrollbar-track]:bg-charcoal-700 [&::-webkit-scrollbar-thumb]:bg-ember-400 [&::-webkit-scrollbar-thumb]:hover:bg-ember-300 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 [&::-webkit-scrollbar]:w-1.5 sm:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
            {children}
          </div>

          {/* Footer with Buttons */}
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

export default Dialog;
