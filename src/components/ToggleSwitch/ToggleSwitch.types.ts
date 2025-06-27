export type ToggleVariant =
  | 'pastel'
  | 'glass'
  | 'glitch'
  | 'material'
  | 'neumorphism';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  variant?: ToggleVariant;
}
