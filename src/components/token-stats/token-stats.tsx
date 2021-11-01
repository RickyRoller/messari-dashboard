import { FC } from 'react';
import styles from './token-stats.module.scss';
import { format } from 'd3';
import { Metrics } from '../../models/metrics';

enum StatType {
  RANK,
  CURRENCY,
  SUPPLY,
}

interface Props {
  metrics: Metrics;
}

export const TokenStats: FC<Props> = ({ metrics }) => {
  const renderStat = (value: number, type: StatType) => {
    switch (type) {
      case StatType.RANK:
        return `#${value}`;
      case StatType.CURRENCY:
        return `$${format('.3s')(value)} USD`.replace('G', 'B');
      case StatType.SUPPLY:
        return `${Math.floor(value).toLocaleString()} ${metrics.symbol}`;
    }
  };

  return (
    <div className={styles.TokenStats}>
      <div className={styles.title}>Key Metrics</div>

      <div className={styles.stats}>
        <div className={styles.statContainer}>
          <div className={styles.label}>Market Cap Rank</div>
          <div className={styles.stat}>
            {renderStat(metrics.marketCapRank, StatType.RANK)}
          </div>
        </div>
        <div className={styles.statContainer}>
          <div className={styles.label}>Market Cap</div>
          <div className={styles.stat}>
            {renderStat(metrics.marketCap, StatType.CURRENCY)}
          </div>
        </div>
        <div className={styles.statContainer}>
          <div className={styles.label}>Circulating Supply</div>
          <div className={styles.stat}>
            {renderStat(metrics.circulatingSupply, StatType.SUPPLY)}
          </div>
        </div>
      </div>
    </div>
  );
};
