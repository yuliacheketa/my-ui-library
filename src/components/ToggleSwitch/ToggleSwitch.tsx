import React from 'react';
import './ToggleSwitch.css';
import type { ToggleSwitchProps } from './ToggleSwitch.types';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  variant = 'pastel',
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <label className={`toggle-switch ${variant} ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      <span className="slider" />
      {label && <span className="label-text">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
