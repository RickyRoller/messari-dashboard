import { TimeInterval, TimeRange } from './time-range';

export interface TimeSeriesRow {
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: number;
  volume: number;
}

export interface TokenDataPayload {
  symbol: string;
  range: TimeRange;
  interval: TimeInterval;
}
