import { ChartMetadata, ChartPlugin } from '@superset-ui/core';
import { t } from '@apache-superset/core/translation';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class SupersetPluginChartDemo extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Superset Plugin Chart Demo',
      name: t('Demo'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../SupersetPluginChartDemo'),
      metadata,
      transformProps,
    });
  }
}
