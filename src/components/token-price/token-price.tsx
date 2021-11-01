import React, { FC } from 'react';
import styles from './token-price.module.scss';
import cx from 'classnames';
import { PriceChange } from '../price-change';
import { Metrics } from '../../models/metrics';
import { TimeRange } from '../../models/time-range';
import { displayPrice } from '../../utils';

interface Props {
  metrics: Metrics;
  timeRange: TimeRange;
}

export const TokenPrice: FC<Props> = ({ metrics, timeRange }) => {
  return (
    <div
      className={cx(styles.TokenPrice, {
        [styles.visible]: metrics.price > 0,
      })}
    >
      <div className={styles.pValue}>{displayPrice(metrics.price)}</div>
      <PriceChange metrics={metrics} timeRange={timeRange} />
    </div>
  );
};
