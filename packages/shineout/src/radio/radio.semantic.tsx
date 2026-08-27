/**
 * Radio Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { RadioSemanticKey } from '@sheinx/base';
import { Radio } from 'shineout';

const RadioSemanticDemo: React.FC = () => (
  <Radio.Group keygen data={['Option A', 'Option B', 'Option C']} defaultValue='Option A' />
);

const radioSemantic: SemanticSchema<RadioSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Radio 最外层容器',
      en: 'Radio outermost wrapper element',
      version: '3.10.0',
      example: `<Radio
  classNames={{ root: 'my-radio' }}
  styles={{ root: { padding: '4px 0' } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '单选框指示器区域（含圆形图标）',
      en: 'Radio indicator area (includes the circle icon)',
      version: '3.10.0',
      example: `<Radio
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { marginRight: 8 } }}
/>`,
    },
    {
      key: 'label',
      cn: '文字标签区域',
      en: 'Label text area',
      version: '3.10.0',
      example: `<Radio
  classNames={{ label: 'my-label' }}
  styles={{ label: { fontWeight: 500 } }}
/>`,
    },
    {
      key: 'group',
      cn: 'Radio.Group 容器',
      en: 'Radio.Group container',
      version: '3.10.0',
      example: `<Radio.Group
  classNames={{ group: 'my-group' }}
  styles={{ group: { gap: 16 } }}
/>`,
    },
  ],
  demo: RadioSemanticDemo,
};

export default radioSemantic;
