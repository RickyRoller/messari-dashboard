import { FC } from 'react';
import styles from './time-range.module.scss';
import { TimeRange, TimeRanges } from '../../models/time-range';

interface Props {
  timeRange: TimeRange;
  rangeSelected: (range: TimeRange) => void;
}

export const TimeRangeSelect: FC<Props> = ({ timeRange, rangeSelected }) => {
  const selectRange = (range: TimeRange) => () => {
    rangeSelected(range);
  };
  const isSelected = (id: number) =>
    id === timeRange.id ? styles.selected : '';
  return (
    <div className={styles.TimeRange}>
      <span
        className={isSelected(TimeRanges.month.id)}
        onClick={selectRange(TimeRanges.month)}
      >
        1M
      </span>
      <span
        className={isSelected(TimeRanges.week.id)}
        onClick={selectRange(TimeRanges.week)}
      >
        1W
      </span>
      <span
        className={isSelected(TimeRanges.day.id)}
        onClick={selectRange(TimeRanges.day)}
      >
        24H
      </span>
    </div>
  );
};
