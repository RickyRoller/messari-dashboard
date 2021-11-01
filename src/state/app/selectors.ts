import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectTimeSeries = (state: RootState) => state.app.timeSeries;
export const selectMetrics = (state: RootState) => state.app.metrics;
const selectRange = (state: RootState) => state.app.timeRange;
const selectInterval = (state: RootState) => state.app.timeInterval;
export const selectTime = createSelector(
  selectRange,
  selectInterval,
  (range, interval) => ({
    range,
    interval,
  }),
);
