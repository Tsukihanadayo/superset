import { validateNonEmpty } from '@superset-ui/core';
import { t } from '@apache-superset/core/translation';
import { ControlPanelConfig, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('查询'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'grouping_dimension',
            config: {
              ...sharedControls.groupby,
              label: t('维度'),
            },
          },
        ],
        [
          {
            name: 'metric_value',
            config: {
              ...sharedControls.metrics,
              label: t('完成量'),
              controlName: 'metric_value',
              multi: false,
              editable: false,
              validators: [validateNonEmpty],
            },
          },
          {
            name: 'target_value',
            config: {
              ...sharedControls.metrics,
              label: t('目标量'),
              controlName: 'target_value',
              multi: false,
              editable: false,
              validators: [validateNonEmpty],
            }
          }
        ],
        [
          {
            name: 'adhoc_filters',
            config: {
              ...sharedControls.adhoc_filters,
              label: t('过滤条件'),
            }
          }
        ],
        [
          {
            name: 'row_limit',
            config: {
              ...sharedControls.row_limit,
              label: t('记录限制'),
            },
          },
        ],
      ],
    },
    {
      label: t('样式'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              label: t('标题'),
              renderTrigger: true,
              default: 'Hello, World!',
            },
          },
        ],
        [
          {
            name: 'bold_text',
            config: {
              type: 'CheckboxControl',
              label: t('加粗文本'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('标题字体大小'),
              default: 'fontSize',
              choices: [
                ['fontSizeSM', 'small'],
                ['fontSize', 'default'],
                ['fontSizeLG', 'large'],
                ['fontSizeXL', 'x-large'],
                ['fontSizeHeading1', 'heading 1'],
                ['fontSizeHeading2', 'heading 2'],
                ['fontSizeHeading3', 'heading 3'],
                ['fontSizeHeading4', 'heading 4'],
                ['fontSizeHeading5', 'heading 5'],
              ],
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'progress_color',
            config: {
              type: 'TextControl',
              label: t('进度条颜色'),
              default: '#4f46e5',
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'max_value',
            config: {
              type: 'TextControl',
              label: t('最大值'),
              default: 100,
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'stroke_width',
            config: {
              type: 'TextControl',
              label: t('环形宽度'),
              default: 18,
              renderTrigger: true,
            },
          },
        ],
      ],
    },
  ],
};

export default config;
