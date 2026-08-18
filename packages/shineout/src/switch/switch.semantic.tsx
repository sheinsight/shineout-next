/**
 * Switch Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { SwitchSemanticKey } from '@sheinx/base';
import { Switch } from 'shineout';

const SwitchSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Switch defaultValue content={['On', 'Off']} />
    <Switch content={['Open', 'Close']} />
  </div>
);

const switchSemantic: SemanticSchema<SwitchSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Switch 最外层容器（button 元素）',
      en: 'Switch outermost wrapper (button element)',
      version: '3.10.0',
      example: `<Switch
  classNames={{ root: 'my-switch' }}
  styles={{ root: { borderRadius: 20 } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '滑块指示器（圆形按钮）',
      en: 'Toggle indicator (circle button)',
      version: '3.10.0',
      example: `<Switch
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { width: 20, height: 20 } }}
/>`,
    },
    {
      key: 'content',
      cn: '文字内容区域',
      en: 'Text content area',
      version: '3.10.0',
      example: `<Switch
  classNames={{ content: 'my-content' }}
  styles={{ content: { fontSize: 12 } }}
/>`,
    },
  ],
  demo: SwitchSemanticDemo,
};

export default switchSemantic;
