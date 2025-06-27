import React from 'react';
import type { GradientSliderRatingProps } from './GradientSliderRating.types.ts';
import './GradientSliderRating.css';

const GradientSliderRating: React.FC<GradientSliderRatingProps> = ({
  value,
  onChange,

  labels = ['😡 Жахливо', '😐 Так собі', '😍 Супер'],
  min = 1,
  max = 5,
  step = 1,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

 

  const getLabel = () => {
    const index = Math.round(((value - min) / (max - min)) * (labels.length - 1));
    return labels[index] || '';
  };

  return (
    <div className="gradient-slider-wrapper">
      <div className="gradient-slider-label">{getLabel()}</div>

      <div className="gradient-slider-container">
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="gradient-slider"
          disabled={disabled}
          aria-valuetext={getLabel()}
        />
      </div>
    </div>
  );
};

export default GradientSliderRating;
