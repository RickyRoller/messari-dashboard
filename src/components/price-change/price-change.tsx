import React, { FC } from 'react';
import styles from './price-change.module.scss';
import { Metrics } from '../../models/metrics';
import { TimeRange } from '../../models/time-range';
import { displayPrice } from '../../utils';

interface Props {
  metrics: Metrics;
  timeRange: TimeRange;
}

export const PriceChange: FC<Props> = ({ metrics, timeRange }) => {
  const renderChange = () => {
    const diff = metrics.price - metrics.pricePeriodOpen;
    const diffAbs = Math.abs(Math.round(diff * 100) / 100);
    const price = displayPrice(diffAbs);
    const value = diff < 0 ? `-${price}` : `+${price}`;

    const diffPercent = diff / metrics.pricePeriodOpen;
    const rounded = Math.round(diffPercent * 10000) / 100;
    const abs = Math.abs(rounded);
    const val = abs.toLocaleString();
    const percent = rounded < 0 ? `(-${val}%)` : `(+${val}%)`;
    return {
      value,
      percent,
    };
  };

  const renderTimeFrame = () => {
    switch (timeRange.metric) {
      case 'hours':
        return `Past 24 Hours`;
      case 'month':
        return `Past 30 days`;
      case 'week':
        return `Past 7 days`;
    }
  };

  const { value, percent } = renderChange();
  return (
    <div className={styles.PriceChange}>
      <span className={styles.pChange}>
        <span>
          {value} {percent}
        </span>
      </span>
      <span className={styles.changeTime}>{renderTimeFrame()}</span>
    </div>
  );
};
