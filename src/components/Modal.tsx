import React, { useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import type { ButtonProps } from './Button';
import Overlay from './Overlay';
import { useClickOutside } from '../hooks/useClickOutside';

type ModalProps = {
  title: string;
  message: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  buttons: {
    cancel: {
      text: string;
      onClick?: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
    confirm?: {
      text: string;
      onClick: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
  };
};

const Modal: React.FC<ModalProps> = ({ title, icon, message, buttons }) => {
  const Modalref = useRef<HTMLDivElement | null>(null);

  const handleCancelClick = () => {
    if (buttons.cancel.onClick) {
      buttons.cancel.onClick();
    }
  };

  useClickOutside(Modalref, () => {
    handleCancelClick();
  });

  return (
    <Overlay isOpen={true}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div
          ref={Modalref}
          className={
            'bg-gradient-charcoal border-ember-600/30 relative mx-auto w-full max-w-md rounded-2xl border shadow-2xl backdrop-blur-xl'
          }
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex items-center rounded-lg p-2">
                  <div className="text-ember-400 h-5 w-5">{icon}</div>
                </div>
              )}
              <h2 className="text-ember-50 mt-1 text-xl font-semibold">
                {title}
              </h2>
            </div>

            <button
              className="text-charcoal-300 hover:text-charcoal-200 hover:bg-charcoal-700 cursor-pointer rounded-lg p-1.5 transition"
              aria-label="Close modal"
              onClick={handleCancelClick}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-2">
            <p className="text-charcoal-200 leading-relaxed">{message}</p>
          </div>

          {/* Footer with Buttons */}
          <div className="border-charcoal-700/50 flex items-center justify-end gap-3 border-t p-6 pt-4">
            {/* Cancel Button */}
            <Button
              text={buttons.cancel.text}
              variant="secondary"
              onClick={handleCancelClick}
              {...buttons.cancel.props}
            />

            {/* Confirm Button (optional) */}
            {buttons.confirm && (
              <Button
                text={buttons.confirm.text}
                variant="primary"
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
