/**
 * Button Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ButtonSemanticKey } from '@sheinx/base';
import Button from './index';

const ButtonSemanticDemo: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button type="primary">Primary</Button>
    <Button type="default">Default</Button>
    <Button type="primary" loading>Loading</Button>
    <Button type="danger" disabled>Disabled</Button>
  </div>
);

const buttonSemantic: SemanticSchema<ButtonSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '按钮元素（button 或 a 标签）',
      en: 'Button element (button or anchor tag)',
      version: '3.10.0',
      example: `<Button
  classNames={{ root: 'my-button' }}
  styles={{ root: { borderRadius: 20 } }}
>
  Click me
</Button>`,
    },
    {
      key: 'loading',
      cn: '加载指示器容器',
      en: 'Loading indicator container',
      version: '3.10.0',
      example: `<Button
  loading
  classNames={{ loading: 'my-spinner' }}
  styles={{ loading: { marginRight: 8 } }}
>
  Submitting
</Button>`,
    },
  ],
  demo: ButtonSemanticDemo,
};

export default buttonSemantic;
