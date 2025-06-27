type GradientSliderRatingProps = {
  value: number;
  onChange: (val: number) => void;
  colors?: string[]; // наприклад: ['#ff4d4f', '#ffc53d', '#73d13d']
  labels?: string[]; // наприклад: ['😡 Жахливо', '😐 Так собі', '😍 Супер']
  min?: number; // дефолт 1
  max?: number; // дефолт 5
  step?: number; // дефолт 1
  disabled?: boolean;
};

export type { GradientSliderRatingProps };