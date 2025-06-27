import React from 'react';

type PixelArtRatingProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  iconType?: 'heart' | 'potion' | 'star';
  disabled?: boolean;
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={filled ? '#ff4d4f' : 'none'}
    stroke="#ff4d4f"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ imageRendering: 'pixelated' }}
  >
    <path d="M12 21C12 21 4 13.73 4 8.5C4 6.42 5.42 5 7.5 5C9 5 10 6 12 8C14 6 15 5 16.5 5C18.58 5 20 6.42 20 8.5C20 13.73 12 21 12 21Z" />
  </svg>
);

const PotionIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={filled ? '#5c8aff' : 'none'}
    stroke="#5c8aff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ imageRendering: 'pixelated' }}
  >
    <path d="M7 21H17L15 13H9L7 21Z" />
    <rect x="9" y="3" width="6" height="10" rx="1" ry="1" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={filled ? '#ffd700' : 'none'}
    stroke="#ffd700"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ imageRendering: 'pixelated' }}
  >
    <polygon points="12 2 15 11 23 11 17 16 19 23 12 19 5 23 7 16 1 11 9 11" />
  </svg>
);

const iconComponents = {
  heart: HeartIcon,
  potion: PotionIcon,
  star: StarIcon,
};

const PixelArtRating: React.FC<PixelArtRatingProps> = ({
  value,
  onChange,
  max = 5,
  iconType = 'heart',
  disabled = false,
}) => {
  const Icon = iconComponents[iconType];

  return (
    <div className="pixel-rating" role="radiogroup" aria-label="Pixel art rating">
      {[...Array(max)].map((_, i) => {
        const filled = i < value;
        const isCurrent = i + 1 === value;

        return (
          <div
            key={i}
            className={`pixel-rating-icon${filled ? ' filled' : ''}${isCurrent ? ' current' : ''}`}
            onClick={() => !disabled && onChange(i + 1)}
            role="radio"
            aria-checked={filled}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Рейтинг ${i + 1} з ${max}`}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                onChange(i + 1);
              }
            }}
          >
            <Icon filled={filled} />
          </div>
        );
      })}
    </div>
  );
};

export default PixelArtRating;
