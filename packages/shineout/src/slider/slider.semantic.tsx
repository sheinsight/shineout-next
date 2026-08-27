/**
 * Slider Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { SliderSemanticKey } from '@sheinx/base';
import { Slider } from 'shineout';

const SliderSemanticDemo: React.FC = () => (
  <div style={{ width: 300, padding: '20px 10px' }}>
    <Slider defaultValue={30} scale={[0, 50, 100]} />
  </div>
);

const sliderSemantic: SemanticSchema<SliderSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Slider 最外层容器',
      en: 'Slider outermost wrapper element',
      version: '3.10.0',
      example: `<Slider
  classNames={{ root: 'my-slider' }}
  styles={{ root: { padding: '16px 0' } }}
/>`,
    },
    {
      key: 'track',
      cn: '滑轨区域',
      en: 'Track area',
      version: '3.10.0',
      example: `<Slider
  classNames={{ track: 'my-track' }}
  styles={{ track: { height: 8, borderRadius: 4 } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '滑块指示器（拖动手柄）',
      en: 'Slider indicator (drag handle)',
      version: '3.10.0',
      example: `<Slider
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { width: 20, height: 20 } }}
/>`,
    },
    {
      key: 'scale',
      cn: '刻度区域',
      en: 'Scale area',
      version: '3.10.0',
      example: `<Slider
  classNames={{ scale: 'my-scale' }}
  styles={{ scale: { marginTop: 8 } }}
/>`,
    },
  ],
  demo: SliderSemanticDemo,
};

export default sliderSemantic;
