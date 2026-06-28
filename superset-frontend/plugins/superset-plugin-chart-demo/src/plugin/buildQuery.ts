import { buildQueryContext, QueryFormData } from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  console.log(formData);

  const metricValue = formData.metric_value;
  const targetValue = formData.target_value;

  const metricArray = Array.isArray(metricValue) ? metricValue : metricValue ? [metricValue] : [];
  const targetArray = Array.isArray(targetValue) ? targetValue : targetValue ? [targetValue] : [];


  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns: formData.grouping_dimension,
      metrics: [
        ...metricArray.map(m => ({
          expressionType: 'SIMPLE' as const,
          column: { column_name: typeof m === 'string' ? m : m.column?.column_name },
          aggregate: m.aggregate,
          label: 'metric_value',
          hasCustomLabel: true,
        })),
        ...targetArray.map(m => ({
          expressionType: 'SIMPLE' as const,
          column: { column_name: typeof m === 'string' ? m : m.column?.column_name },
          aggregate: m.aggregate,
          label: 'target_value',
          hasCustomLabel: true,
        })),
      ]
    },
  ]);
}
