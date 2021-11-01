export interface RawMetrics {
  market_data: {
    price_usd: number;
    ohlcv_last_24_hour: {
      open: number;
    };
  };
  marketcap: {
    rank: number;
    current_marketcap_usd: number;
  };
  supply: {
    circulating: number;
  };
  all_time_high: {
    price: number;
  };
  symbol: string;
}

export interface Metrics {
  price: number;
  priceATH: number;
  pricePeriodOpen: number;
  marketCapRank: number;
  marketCap: number;
  circulatingSupply: number;
  symbol: string;
}

export const defaultMetrics: Metrics = {
  price: 0,
  priceATH: 0,
  pricePeriodOpen: 0,
  marketCapRank: 0,
  marketCap: 0,
  circulatingSupply: 0,
  symbol: '',
};
