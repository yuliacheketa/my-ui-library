import React from 'react';
import './Button.css';
import type { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  const classNames = [
    'app-button',
    variant,
    size,
    fullWidth ? 'full-width' : '',
    disabled ? 'disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {startIcon && <span className="icon start-icon">{startIcon}</span>}
      <span className="button-content">{children}</span>
      {endIcon && <span className="icon end-icon">{endIcon}</span>}
    </button>
  );
};

export default Button;
export type { ButtonProps } from './Button.types';