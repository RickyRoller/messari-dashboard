import { createReducer } from '@reduxjs/toolkit';
import { fetchTokenData, setTime } from './actions';
import { AppStatus } from '../../models/app-status';
import { TimeSeriesRow } from '../../models/time-series-row';
import { defaultMetrics, Metrics } from '../../models/metrics';
import { TimeInterval, TimeRange, TimeRanges } from '../../models/time-range';

interface AppState {
  timeSeries: TimeSeriesRow[];
  metrics: Metrics;
  timeRange: TimeRange;
  timeInterval: TimeInterval;
  status: AppStatus;
}

const initialState: AppState = {
  timeSeries: [],
  metrics: defaultMetrics,
  timeRange: TimeRanges.month,
  timeInterval: TimeInterval.DAY,
  status: AppStatus.INIT,
};

const appReducer = createReducer(initialState, (app) => {
  app.addCase(
    fetchTokenData.pending,
    (state: AppState): AppState => ({
      ...state,
      // metrics: defaultMetrics,
      timeSeries: [],
    }),
  );

  app.addCase(
    fetchTokenData.fulfilled,
    (state: AppState, { payload }): AppState => ({
      ...state,
      metrics: {
        ...state.metrics,
        ...payload.metrics,
        pricePeriodOpen: payload.timeSeries[0]?.open ?? 0,
      },
      timeSeries: payload.timeSeries,
    }),
  );

  app.addCase(
    setTime,
    (state: AppState, { payload }): AppState => ({
      ...state,
      timeRange: payload.range,
      timeInterval: payload.interval,
    }),
  );
});

export default appReducer;
