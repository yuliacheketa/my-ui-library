import React from 'react';
import type { TimelineItem } from './TimeLine.types';

interface TimelineProps {
  items: TimelineItem[];
  darkMode?: boolean; 
}

const getTypeClass = (type?: string): string => {
  if (!type) return '';
  return `timeline-item--${type}`;
};

const Timeline: React.FC<TimelineProps> = ({ items, darkMode = false }) => {
  return (
    <div className={`timeline ${darkMode ? 'timeline--dark' : ''}`}>
      {items.map((item) => (
        <div key={item.id} className={`timeline-item ${getTypeClass(item.type)} ${darkMode ? 'timeline-item--dark timeline-item__dot--dark timeline-item__content--dark' : ''}`}>
          <div className={`timeline-item__dot ${darkMode ? 'timeline-item__dot--dark' : ''}`}>
            {item.icon ? item.icon : <span className="default-icon">•</span>}
          </div>
          <div className={`timeline-item__content ${darkMode ? 'timeline-item__content--dark' : ''}`}>
            <div className="timeline-item__title">{item.title}</div>
            {item.description && <div className="timeline-item__description">{item.description}</div>}
            <div className="timeline-item__time">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;