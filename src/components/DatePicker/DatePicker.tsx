// src/components/DatePicker/DatePicker.tsx
import React, { useState, useEffect } from 'react';
import type { DatePickerProps, DateRange, LocaleStrings } from './DatePicker.types';
import './DatePicker.css';

const defaultLocale: LocaleStrings = {
  weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
  monthsLong: [
    'Січень', 'Лютий', 'Березень', 'Квітень',
    'Травень', 'Червень', 'Липень', 'Серпень',
    'Вересень', 'Жовтень', 'Листопад', 'Грудень',
  ],
};

function areDatesEqual(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getDaysForMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 7 : startDay;
  const paddingDays = startDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array(paddingDays).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date) {
  if (!date) return true;
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
}

function isDateInRange(date: Date, range: DateRange) {
  if (!range.start || !range.end) return false;
  return date >= range.start && date <= range.end;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  rangeMode = false,
  minDate,
  maxDate,
  locale = defaultLocale,
  disabled = false,
  className = '',
  style = {},
  label,
}) => {
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (value instanceof Date) return value;
    if (value && 'start' in value && value.start) return value.start;
    return new Date();
  });

  const [rangeSelection, setRangeSelection] = useState<DateRange>(() => {
    if (value && 'start' in value && value.start) return value as DateRange;
    return { start: null, end: null };
  });

  useEffect(() => {
    if (rangeMode && value && 'start' in value) {
      setRangeSelection(value as DateRange);
    } else if (!rangeMode && value instanceof Date) {
      setViewDate(value);
    }
  }, [value, rangeMode]);

  const prevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const days = getDaysForMonth(viewDate.getFullYear(), viewDate.getMonth());

  const onDateClick = (date: Date) => {
    if (disabled || isDateDisabled(date, minDate, maxDate)) return;

    if (!rangeMode) {
      onChange(date);
    } else {
      if (!rangeSelection.start || (rangeSelection.start && rangeSelection.end)) {
        const newRange = { start: date, end: null };
        setRangeSelection(newRange);
        onChange(newRange);
      } else if (rangeSelection.start && !rangeSelection.end) {
        let newRange: DateRange;
        if (date < rangeSelection.start) {
          newRange = { start: date, end: rangeSelection.start };
        } else {
          newRange = { start: rangeSelection.start, end: date };
        }
        setRangeSelection(newRange);
        onChange(newRange);
      }
    }
  };

  return (
    <div className={`date-picker ${className}`} style={style}>
      {label && <div className="date-picker-label">{label}</div>}
      <div className="date-picker-container">
        <header className="date-picker-header">
          <button onClick={prevMonth} disabled={disabled}>‹</button>
          <div className="date-picker-month-year">
            {locale.monthsLong[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button onClick={nextMonth} disabled={disabled}>›</button>
        </header>

        <div className="date-picker-weekdays">
          {locale.weekdaysShort.map((day) => (
            <div key={day} className="date-picker-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="date-picker-days">
          {days.map((day, idx) => {
            if (day === null)
              return <div key={'empty-' + idx} className="date-picker-day empty" aria-disabled="true" />;

            const disabledDay = isDateDisabled(day, minDate, maxDate);
            const selectedDay = rangeMode
              ? day &&
                rangeSelection.start &&
                rangeSelection.end &&
                isDateInRange(day, rangeSelection)
              : value instanceof Date && areDatesEqual(day, value);

            const inRange =
              rangeMode &&
              rangeSelection.start &&
              rangeSelection.end &&
              isDateInRange(day, rangeSelection);

            return (
              <button
                key={day.toISOString()}
                className={`date-picker-day${disabledDay ? ' disabled' : ''}${
                  selectedDay ? ' selected' : ''
                }${inRange ? ' in-range' : ''}`}
                onClick={() => onDateClick(day)}
                disabled={disabledDay || disabled}
                aria-selected={selectedDay}
                tabIndex={selectedDay ? 0 : -1}
                type="button"
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;