import React, { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Chart } from '../chart';
import { TokenBar } from '../token-bar';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMetrics,
  selectTime,
  selectTimeSeries,
} from '../../state/app/selectors';
import { fetchTokenData, setTime } from '../../state/app/actions';
import {
  DELTA_COLORS,
  TOKENS,
  TRANSITION_DURATION,
} from '../../services/constants';
import { Token } from '../../models/token';
import { TokenStats } from '../token-stats';
import { TimeRangeSelect } from '../time-range';
import { TokenPrice } from '../token-price';
import { TimeRange } from '../../models/time-range';
import { rangeToInterval } from '../../utils';

function App() {
  const dispatch = useDispatch();
  const timeSeriesData = useSelector(selectTimeSeries);
  const metrics = useSelector(selectMetrics);
  const time = useSelector(selectTime);
  const [token, setToken] = useState<Token>(TOKENS[0]);

  const updateDeltaColor = useCallback(() => {
    if (metrics.price === 0) return;

    const deltaColor =
      metrics.price < metrics.pricePeriodOpen
        ? DELTA_COLORS.NEGATIVE
        : DELTA_COLORS.POSITIVE;
    setTimeout(() => {
      document.documentElement.style.setProperty('--delta-color', deltaColor);
    }, TRANSITION_DURATION);
  }, [metrics]);

  useEffect(() => {
    updateDeltaColor();
  }, [metrics, updateDeltaColor]);

  useEffect(() => {
    dispatch(
      fetchTokenData({
        symbol: token.symbol,
        range: time.range,
        interval: time.interval,
      }),
    );
  }, [token, time]);

  const tokenChanged = (t: Token) => {
    setToken(t);
  };

  const timeRangeChanged = (range: TimeRange) => {
    const interval = rangeToInterval(range);
    dispatch(setTime({ range, interval }));
  };

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <span>Messari Dashboard</span>
        <span>Ricky Roller | suzamaki.eth</span>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.leftContainer} />
        <div className={styles.content}>
          <TokenBar token={token} onTokenSelect={tokenChanged} />
          <div className={styles.priceTime}>
            <TokenPrice metrics={metrics} timeRange={time.range} />
            <TimeRangeSelect
              timeRange={time.range}
              rangeSelected={timeRangeChanged}
            />
          </div>
          <Chart data={timeSeriesData} />
          <TokenStats metrics={metrics} />
        </div>

        <div className={styles.rightContainer} />
      </div>
    </div>
  );
}

export default App;
