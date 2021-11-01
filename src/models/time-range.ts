export interface TimeRange {
  id: number;
  value: number;
  metric: 'month' | 'week' | 'hours';
}

export const TimeRanges: {
  [index: string]: TimeRange;
  month: TimeRange;
  week: TimeRange;
  day: TimeRange;
} = {
  month: {
    value: 1,
    metric: 'month',
    id: 0,
  },
  week: {
    value: 1,
    metric: 'week',
    id: 1,
  },
  day: {
    value: 25,
    metric: 'hours',
    id: 2,
  },
};

export enum TimeInterval {
  DAY = '1d',
  HOUR = '1h',
  MINUTES = '15m',
}
