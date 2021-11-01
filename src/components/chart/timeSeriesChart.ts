import * as d3 from 'd3';
import { TimeSeriesRow } from '../../models/time-series-row';
import { TRANSITION_DURATION } from '../../services/constants';

export const TimeSeriesChart = (svgEl: SVGSVGElement) => {
  const svg = d3.select(svgEl);
  const width = 680;
  const height = 280;
  const yPadding = 0.1;

  const defs = svg.append('defs');
  const linearGradient = defs
    .append('linearGradient')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 1)
    .attr('id', 'gradient');
  linearGradient
    .append('stop')
    .attr('stop-color', 'var(--delta-color)')
    .attr('stop-opacity', 0.2)
    .attr('offset', '0%');
  linearGradient
    .append('stop')
    .attr('stop-color', 'var(--delta-color)')
    .attr('stop-opacity', 0)
    .attr('offset', '100%');

  const yScale = d3.scaleLinear().range([height, 0]);
  const xScale = d3.scaleTime().range([0, width]);

  const lineG = svg.append('g').classed('lineG', true);
  const line = lineG
    .append('path')
    .classed('line', true)
    .attr('stroke', 'var(--delta-color)')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  const lineGen = d3
    .line<TimeSeriesRow>()
    .x((d: TimeSeriesRow) => xScale(new Date(d.timestamp)))
    .y((d: TimeSeriesRow) => yScale(d.close));

  const gradPoly = svg
    .append('g')
    .classed('gradPolyG', true)
    .append('path')
    .classed('gradPoly', true)
    .attr('fill', 'url(#gradient)')
    .attr('stroke', 'none');

  return (data: TimeSeriesRow[]) => {
    const { yExtent, xExtent } = getExtents(data, yPadding);
    yScale.domain(yExtent);
    xScale.domain(xExtent);

    gradPoly
      .datum(data)
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('opacity', 0)
      .transition()
      .delay(TRANSITION_DURATION)
      .duration(0)
      .attr('d', (d) => {
        const path = lineGen(d);
        return `${path} L ${width},${height} L 0,${height} Z`;
      })
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('opacity', 1);

    line
      .datum(data)
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('opacity', 0)
      .transition()
      .delay(TRANSITION_DURATION)
      .duration(0)
      .attr('d', lineGen)
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('opacity', 1);
  };
};

const getExtents = (data: TimeSeriesRow[], yPadding: number) => {
  const yExtent = d3.extent(data, (d: TimeSeriesRow): number => d.close) as [
    number,
    number,
  ];
  const paddedYExtent = yExtent.map((d: number, i: number) =>
    i === 0 ? d * (1 - yPadding) : d * (1 + yPadding),
  );

  const timeStamps = data.map((d: TimeSeriesRow) => new Date(d.timestamp));
  const xExtent = d3.extent(timeStamps) as [Date, Date];

  return {
    yExtent: paddedYExtent,
    xExtent,
  };
};
