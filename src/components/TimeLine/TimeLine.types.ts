

export type TimelineItemType = 'success' | 'warning' | 'info' | 'danger';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  type?: TimelineItemType;
  icon?: React.ReactNode; // дозволяємо кастомну іконку
}