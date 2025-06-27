export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  width?: string | number;
  height?: string | number;
  showCloseButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
  animationDuration?: number;
};