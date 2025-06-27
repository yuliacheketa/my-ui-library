import React from 'react';
import './CheckBoxGroup.css';

export type CheckboxOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type CheckboxGroupProps = {
  legend?: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (newSelected: string[]) => void;
  name?: string;
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  options,
  selectedValues,
  onChange,
  name = 'checkbox-group',
}) => {
  const toggleValue = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  return (
    <fieldset className="checkbox-group">
      {legend && <legend className="checkbox-group-legend">{legend}</legend>}
      {options.map(({ label, value, icon }) => (
        <label key={value} className="checkbox-wrapper">
          <input
            type="checkbox"
            className="checkbox-input"
            name={name}
            value={value}
            checked={selectedValues.includes(value)}
            onChange={() => toggleValue(value)}
          />
          <span className="checkbox-tile">
            {icon && <span className="checkbox-icon">{icon}</span>}
            <span className="checkbox-label">{label}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
};

export default CheckboxGroup;