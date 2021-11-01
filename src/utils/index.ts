import { TimeInterval, TimeRange, TimeRanges } from '../models/time-range';

export const rangeToInterval = (range: TimeRange): TimeInterval => {
  switch (range.id) {
    case TimeRanges.month.id:
    default:
      return TimeInterval.DAY;
    case TimeRanges.week.id:
      return TimeInterval.HOUR;
    case TimeRanges.day.id:
      return TimeInterval.MINUTES;
  }
};

export const displayPrice = (val: number) => {
  const rounded = Math.round(val * 100) / 100;
  return `$${rounded.toLocaleString()}`;
};
