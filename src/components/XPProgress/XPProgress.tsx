import React, { useEffect, useState } from 'react';
import './XPProgress.css';

type XPProgressProps = {
  level: number;
  xp: number;
  maxXp: number;
  animated?: boolean;
};

const XPProgress: React.FC<XPProgressProps> = ({ level, xp, maxXp, animated = true }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timeout = setTimeout(() => setProgress((xp / maxXp) * 100), 100);
      return () => clearTimeout(timeout);
    } else {
      setProgress((xp / maxXp) * 100);
    }
  }, [xp, maxXp, animated]);

  return (
    <div className="xp-container" role="progressbar" aria-valuenow={xp} aria-valuemax={maxXp}>
      <div className="xp-header">
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${progress}%` }} />
        {progress >= 100 && <div className="xp-particles">✨</div>}
      </div>
    </div>
  );
};

export default XPProgress;
