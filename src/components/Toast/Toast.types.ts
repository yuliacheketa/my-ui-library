export type ToastType = 'success' | 'error' | 'info';

export type ToastVariant = 'pastel' | 'glass' | 'retro';

export type ToastData = {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  variant?: ToastVariant;
};

export type ToastProps = ToastData & {
  onClose: (id: string) => void;
};

export type ToastContextType = {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
};
