import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../services/data';
import { TimeInterval, TimeRange } from '../../models/time-range';
import { TokenDataPayload } from '../../models/time-series-row';

export const fetchTokenData = createAsyncThunk(
  'app/fetchTokenMetrics',
  async (data: TokenDataPayload) => {
    const [metrics, timeSeries] = await Promise.all([
      DataService.fetchMetrics(data.symbol),
      DataService.fetchTimeSeries(data),
    ]);
    return {
      metrics,
      timeSeries,
    };
  },
);

export const setTime =
  createAction<{ range: TimeRange; interval: TimeInterval }>('app/setTime');
