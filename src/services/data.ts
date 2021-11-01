import { TimeSeriesRow, TokenDataPayload } from '../models/time-series-row';
import { Metrics, RawMetrics } from '../models/metrics';
import moment from 'moment';

const baseHeaders = {
  'x-messari-api-key': process.env.REACT_APP_MESSARI_API ?? '',
};

const TIME_SERIES_URL = (
  symbol: string,
  start: number,
  end: number,
  interval: string,
) =>
  `https://data.messari.io/api/v1/assets/${symbol}/metrics/price/time-series?start=${start}&end=${end}&interval=${interval}`;
const METRICS_URL = (symbol: string) =>
  `https://data.messari.io/api/v1/assets/${symbol}/metrics`;

const fetchMetrics = async (symbol: string): Promise<Metrics> => {
  const res = await fetch(METRICS_URL(symbol), {
    method: 'GET',
    headers: baseHeaders,
  });

  const { data } = await res.json();

  return extractMetrics(data);
};

const fetchTimeSeries = async ({
  symbol,
  interval,
  range,
}: TokenDataPayload): Promise<TimeSeriesRow[]> => {
  const start = moment().subtract(range.value, range.metric).valueOf();
  const end = moment().valueOf();
  const res = await fetch(TIME_SERIES_URL(symbol, start, end, interval), {
    method: 'GET',
    headers: baseHeaders,
  });

  const { data } = await res.json();
  const numbersToObjects = zipValues(data.parameters.columns);
  return data.values.map(numbersToObjects);
};

const zipValues =
  (columns: string[]) =>
  (values: number[]): TimeSeriesRow => {
    return values.reduce(
      (obj: Partial<TimeSeriesRow>, val: number, index: number) => ({
        ...obj,
        [columns[index]]: val,
      }),
      {},
    ) as TimeSeriesRow;
  };

const extractMetrics = (rawMetrics: RawMetrics): Metrics => ({
  price: rawMetrics.market_data.price_usd,
  priceATH: rawMetrics.all_time_high.price,
  pricePeriodOpen: 0,
  marketCapRank: rawMetrics.marketcap.rank,
  marketCap: rawMetrics.marketcap.current_marketcap_usd,
  circulatingSupply: rawMetrics.supply.circulating,
  symbol: rawMetrics.symbol,
});

export const DataService = {
  fetchTimeSeries,
  fetchMetrics,
};
