import { VisualizeBarChart, VisualizeLineChart, VisualizeRuntimeProps } from './common';
import { Bar, Line } from 'react-chartjs-2';
import React, { useMemo } from 'react';
import { prerenderMode } from '@ossinsight-lite/runtime';
import { BarElement, CategoryScale, Chart as ChartJs, Filler, Legend, LinearScale, LineElement, PointElement, TimeScale, TimeSeriesScale, Title, Tooltip as _Tooltip } from 'chart.js';
import { getCartesianScaleOption } from './chartjs/getCartesianScaleOption';
import { titlePlugin } from './chartjs/titlePlugin';
import { legendsPlugin } from './chartjs/legendsPlugin';
import { barDataset, lineDataset } from './chartjs/getXYData';
import '@ossinsight-lite/roughness/chartjs';

ChartJs.register(
  TimeScale,
  TimeSeriesScale,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Title,
  _Tooltip,
  Legend,
  Filler,
);

export default function LineChartVisualize ({ result, running, title, x, y }: VisualizeBarChart & VisualizeRuntimeProps) {
  const data = useMemo(() => {
    return result?.data ?? [];
  }, [result?.data]);
  return (
    <Bar<{ x: number, y: number }[]>
      width="100%"
      height="100%"
      data={{
        datasets: [barDataset(data, x, y)],
      }}
      options={{
        animation: prerenderMode ? false : undefined,
        maintainAspectRatio: false,
        indexAxis: (['x', 'y'] as const)[[x, y].findIndex(axis => axis.type !== 'value') ?? 0] ?? 'x',
        scales: {
          x: getCartesianScaleOption(data, x, 'x'),
          y: getCartesianScaleOption(data, y, 'y'),
        },
        plugins: {
          title: titlePlugin(title),
          legend: legendsPlugin(),
        },
      }}
    />
  );
}
