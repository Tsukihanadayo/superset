import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;

  const styleConfig = {
    boldText: formData.boldText,
    headerFontSize: formData.headerFontSize ?? 'default',
    headerText: formData.headerText ?? 'Hello World!',
    progressColor: formData.progressColor ?? '#4f46e5',
    maxValue: formData.maxValue ?? 100,
    strokeWidth: formData.strokeWidth ?? 20,
  };

  console.log(styleConfig);

  const queryConfig = {
    groupingDimension: formData.groupingDimension,
    metricValue: formData.metricValue,
    targetValue: formData.targetValue,
  }

  console.log(queryConfig);

  const data = (queriesData?.[0]?.data ?? []) as TimeseriesDataRecord[];

  console.log(data);

  const progressData = data.map(row => {
    const metricValue = Number(row.metric_value);
    const targetValue = Number(row.target_value);

    return {
      name: row[formData.groupingDimension?.[0]],
      value: Math.round((metricValue / targetValue) * 100),
    };
  });

  console.log(progressData);

  return {
    width,
    height,
    data,
    progressData,
    maxValue: styleConfig.maxValue,
    progressColor: styleConfig.progressColor,
    strokeWidth: styleConfig.strokeWidth,
    boldText: styleConfig.boldText,
    headerFontSize: styleConfig.headerFontSize,
    headerText: styleConfig.headerText,
  };
}
