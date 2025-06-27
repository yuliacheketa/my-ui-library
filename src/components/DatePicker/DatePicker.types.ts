export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type LocaleStrings = {
  weekdaysShort: string[]; 
  monthsLong: string[];    
};

export type DatePickerProps = {
  value: Date | DateRange | null;
  onChange: (date: Date | DateRange | null) => void;
  rangeMode?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: LocaleStrings;
  showTime?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string; 
};
