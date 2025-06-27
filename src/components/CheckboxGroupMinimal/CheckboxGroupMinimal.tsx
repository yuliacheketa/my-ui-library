import React from 'react';
import './CheckboxGroupMinimal.css'; // Ensure you have the appropriate styles
type Option = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

type CheckboxGroupMinimalProps = {
  legend: string;
  options: Option[];
  selected: string[];
  onChange: (selectedValues: string[]) => void;  // <-- масив рядків
};

export const CheckboxGroupMinimal: React.FC<CheckboxGroupMinimalProps> = ({
  legend,
  options,
  selected,
  onChange,
}) => {
  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <fieldset className="checkbox-group-minimal">
      <legend className="checkbox-group-minimal-legend">{legend}</legend>
      <div className="checkbox-list-minimal">
        {options.map(({ label, value, icon }) => (
          <label
            key={value}
            className={`checkbox-minimal ${selected.includes(value) ? 'checked' : ''}`}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleValue(value);
              }
            }}
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggleValue(value)}
              className="checkbox-input-minimal"
              aria-checked={selected.includes(value)}
              aria-label={label}
            />
            <span className="checkbox-icon-minimal">{icon}</span>
            <span className="checkbox-label-minimal">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroupMinimal;