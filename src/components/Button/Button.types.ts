export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'glow'
  | 'neon'
  | 'glass'
  | 'cyberpunk'
  | 'pulse';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}
