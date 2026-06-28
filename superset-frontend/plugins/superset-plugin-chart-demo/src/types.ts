import { QueryFormData, TimeseriesDataRecord } from '@superset-ui/core';

export interface SupersetPluginChartDemoStylesProps {
  height: number;
  width: number;
  headerFontSize: 'fontSizeSM' | 'fontSize' | 'fontSizeLG' | 'fontSizeXL' | 'fontSizeHeading1' | 'fontSizeHeading2' | 'fontSizeHeading3' | 'fontSizeHeading4' | 'fontSizeHeading5';
  boldText: boolean;
}

interface SupersetPluginChartDemoCustomizeProps {
  headerText: string;           // 标题文本
  progressColor?: string;       // 进度条颜色
  maxValue?: number;            // 进度最大值
  strokeWidth?: number;         // 环的宽度
  groupBy?: string[];           // 分组维度
}

export type SupersetPluginChartDemoQueryFormData = QueryFormData & SupersetPluginChartDemoStylesProps & SupersetPluginChartDemoCustomizeProps;

export type SupersetPluginChartDemoProps = SupersetPluginChartDemoStylesProps &
  SupersetPluginChartDemoCustomizeProps & {
    data: TimeseriesDataRecord[];
    progressData: Array<{ name: string; value: number }>;
  };
