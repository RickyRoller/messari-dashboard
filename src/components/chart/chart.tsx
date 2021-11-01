import { FC, useEffect, useRef } from 'react';
import styles from './chart.module.scss';
import { TimeSeriesChart } from './timeSeriesChart';
import { TimeSeriesRow } from '../../models/time-series-row';
import { displayPrice } from '../../utils';

interface Props {
  data: TimeSeriesRow[];
}

export const Chart: FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const timeSeriesChart = useRef<(data: TimeSeriesRow[]) => void>();

  useEffect(() => {
    if (svgRef.current !== null) {
      timeSeriesChart.current = TimeSeriesChart(svgRef.current);
    }
  }, []);

  useEffect(() => {
    if (timeSeriesChart.current !== undefined) {
      timeSeriesChart.current(data);
    }
  }, [data]);

  return (
    <div className={styles.Chart}>
      <svg ref={svgRef} viewBox="0 0 680 280" />

      <div className={styles.priceRange}>
        {data.length > 0 ? (
          <>
            <span className={styles.price}>{displayPrice(data[0].close)}</span>
            <span className={styles.price}>
              {displayPrice(data[data.length - 1].close)}
            </span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
};
