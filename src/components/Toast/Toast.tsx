import React, { useEffect } from 'react';
import './Toast.css';
import type { ToastProps } from './Toast.types';

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose,
  variant = 'pastel',
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`toast ${variant} ${type}`}>
      <span className="icon">{type === 'success' ? '✔' : type === 'error' ? '✖' : 'ℹ'}</span>
      <span className="message">{message}</span>
    </div>
  );
};

export default Toast;
