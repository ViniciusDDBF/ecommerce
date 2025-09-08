import React, { useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import type { ButtonProps } from './Button';
import Overlay from './Overlay';
import { useClickOutside } from '../hooks/useClickOutside';

type DialogProps = {
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
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  description,
  icon,
  size = 'md',
  children,
  buttons,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const handleClose = () => {
    if (buttons?.cancel?.onClick) {
      buttons.cancel.onClick();
    }
    if (onClose) {
      onClose();
    }
  };

  useClickOutside(dialogRef, handleClose);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          className={`overflow-visible relative w-full ${sizeClasses[size]} mx-auto bg-gradient-charcoal backdrop-blur-xl border border-ember-600/30 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-charcoal-700/50">
            <div className=" flex items-center gap-3">
              {icon && (
                <div className=" p-2 rounded-lg flex items-center">
                  <div className=" w-5 h-5 text-ember-400">{icon}</div>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-ember-50">{title}</h2>
                {description && (
                  <p className="text-sm text-charcoal-300 mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              className="p-1.5 text-charcoal-300 hover:text-charcoal-200 hover:bg-charcoal-700 rounded-lg transition cursor-pointer"
              aria-label="Close dialog"
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-visible flex-1 p-6">{children}</div>

          {/* Footer with Buttons */}
          {buttons && (
            <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-charcoal-700/50">
              {buttons.cancel && (
                <Button
                  text={buttons.cancel.text}
                  variant="secondary"
                  onClick={handleClose}
                  {...buttons.cancel.props}
                />
              )}

              {buttons.confirm && (
                <Button
                  text={buttons.confirm.text}
                  variant="primary"
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
