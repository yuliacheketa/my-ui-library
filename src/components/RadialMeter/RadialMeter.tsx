import React, { useEffect, useRef, useState } from 'react';

type RadialMeterProps = {
  value: number; // 0-100
  label?: string;
  showNeedle?: boolean;
  size?: number; // діаметр, px, default 150
  strokeWidth?: number; // товщина дуги, default 15
};

const RadialMeter: React.FC<RadialMeterProps> = ({
  value,
  label = '',
  showNeedle = true,
  size = 150,
  strokeWidth = 15,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animatedValue, setAnimatedValue] = useState(0);
const requestRef = useRef<number | null>(null);


  // Плавна анімація значення з easing
  useEffect(() => {
    let start: number | null = null;
    const duration = 1000; // 1 секунда

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      // easing easeOutQuad
      const eased = 1 - (1 - progressRatio) * (1 - progressRatio);

      setAnimatedValue(eased * value);

      if (progress < duration) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value]);

  // Колір від червоного (0) до зеленого (100) через жовтий (50)
  const getColor = (val: number) => {
    if (val < 50) {
      // interpolate red (#FF4E42) -> yellow (#FFD93B)
      const ratio = val / 50;
      const r = Math.round(255 + ratio * (255 - 255));
      const g = Math.round(78 + ratio * (217 - 78));
      const b = Math.round(66 + ratio * (59 - 66));
      return `rgb(${r},${g},${b})`;
    } else {
      // interpolate yellow -> green (#4CAF50)
      const ratio = (val - 50) / 50;
      const r = Math.round(255 - ratio * (255 - 76));
      const g = Math.round(217 - ratio * (217 - 175));
      const b = Math.round(59 - ratio * (59 - 80));
      return `rgb(${r},${g},${b})`;
    }
  };

  // Кут заповнення (0% = 0deg, 100% = 270deg)
  // Дуга починається з 135 градусів і йде до 405 (270 градусів)
  // SVG починає від 3 годин, тому треба повернути (-90deg)
  const startAngle = 135;
  const totalAngle = 270;
  const fillAngle = (animatedValue / 100) * totalAngle;

  // Стрілка (needle) позиціюється по fillAngle + startAngle
  const needleAngle = startAngle + fillAngle;

  // Stroke dashoffset для дуги
  const strokeDashoffset = circumference * (1 - animatedValue / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label ? `${label}: ${Math.round(animatedValue)}%` : `Rating: ${Math.round(animatedValue)}%`}
    >
      {/* Фонова дуга */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#eee"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.25} // залишаємо порожню частину
      />

      {/* Заповнена дуга */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={getColor(animatedValue)}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
      />

      {/* Стрілка */}
      {showNeedle && (
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + radius * Math.cos(((needleAngle - 90) * Math.PI) / 180)}
          y2={size / 2 + radius * Math.sin(((needleAngle - 90) * Math.PI) / 180)}
          stroke="#333"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />
      )}

      {/* Центр - кружечок */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={strokeWidth / 2 + 2}
        fill="#fff"
        stroke="#ccc"
        strokeWidth={1}
      />

      {/* Текст у центрі */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 5}
        fontWeight="bold"
        fill={getColor(animatedValue)}
        style={{ userSelect: 'none' }}
      >
        {Math.round(animatedValue)}
      </text>

      {/* Лейбл */}
      {label && (
        <text
          x="50%"
          y={size - strokeWidth / 2}
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={size / 10}
          fill="#666"
          style={{ userSelect: 'none' }}
        >
          {label}
        </text>
      )}
    </svg>
  );
};

export default RadialMeter;
