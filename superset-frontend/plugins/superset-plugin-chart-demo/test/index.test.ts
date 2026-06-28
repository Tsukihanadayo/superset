/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { SupersetPluginChartDemo } from '../src';
import transformProps from '../src/plugin/transformProps';

/**
 * The example tests in this file act as a starting point, and
 * we encourage you to build more. These tests check that the
 * plugin loads properly, and focus on `transformProps`
 * to ake sure that data, controls, and props are all
 * treated correctly (e.g. formData from plugin controls
 * properly transform the data and/or any resulting props).
 */
describe('superset-plugin-chart-demo', () => {
  it('exists', () => {
    expect(SupersetPluginChartDemo).toBeDefined();
  });

  it('derives the progress value from the first metric row', () => {
    const props = transformProps({
      width: 240,
      height: 240,
      formData: {
        boldText: true,
        headerFontSize: 'fontSizeLG',
        headerText: '完成率',
        maxValue: 100,
        progressColor: '#4f46e5',
        strokeWidth: 18,
      },
      queriesData: [
        {
          data: [{ metric: 75 }],
        },
      ],
    } as any);

    expect(props.progressValue).toBe(75);
    expect(props.maxValue).toBe(100);
    expect(props.progressColor).toBe('#4f46e5');
  });

  it('supports snake_case form data from the control panel', () => {
    const props = transformProps({
      width: 240,
      height: 240,
      formData: {
        bold_text: true,
        header_font_size: 'fontSizeXL',
        header_text: '完成率',
        max_value: 120,
        progress_color: '#10b981',
        stroke_width: 24,
        progress_mode: 'metric',
        progress_metric: { label: 'metric' },
      },
      queriesData: [
        {
          data: [{ metric: 90 }],
        },
      ],
    } as any);

    expect(props.firstRowProgressData).toBe(90);
    expect(props.maxValue).toBe(120);
    expect(props.progressColor).toBe('#10b981');
    expect(props.strokeWidth).toBe(24);
    expect(props.headerText).toBe('完成率');
    expect(props.boldText).toBe(true);
    expect(props.headerFontSize).toBe('fontSizeXL');
  });
});
