
import React from 'react';
import './HorizontalTimeline.css';

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface HorizontalTimelineProps {
  steps: Step[];
  darkMode?: boolean;
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ steps, darkMode = false }) => {
  return (
    <div className={`horizontal-timeline ${darkMode ? 'dark' : ''}`}>
      {steps.map((step, index) => (
        <div key={step.id} className={`step ${step.status ? `step--${step.status}` : ''}`}>
          <div className="step__dot">
            <div className="step__icon">{step.icon || step.title.charAt(0)}</div>
          </div>
          <div className="step__content">
            <div className="step__title">{step.title}</div>
            {step.description && <div className="step__description">{step.description}</div>}
          </div>
          {index !== steps.length - 1 && <div className="step__line" />}
        </div>
      ))}
    </div>
  );
};

export default HorizontalTimeline;