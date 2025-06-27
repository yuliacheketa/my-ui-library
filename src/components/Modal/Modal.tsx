// src/components/Modal/Modal.tsx
import React, { useEffect, useCallback } from 'react';
import type { ModalProps } from './Modal.types';
import './Modal.css';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  width = '500px',
  height = 'auto',
  showCloseButton = true,
  className = '',
  style = {},
  animationDuration = 300,
}) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden'; // заборона скролу під модалкою
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onKeyDown]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${className}`}
      style={{ animationDuration: animationDuration + 'ms' }}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-window"
        style={{ width, height, animationDuration: animationDuration + 'ms', ...style }}
      >
        {showCloseButton && (
          <button
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        )}
        {title && <div className="modal-header">{title}</div>}
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
