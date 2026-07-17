/**
 * Alert Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { AlertSemanticKey } from '@sheinx/base';
import Alert from './index';

const AlertSemanticDemo: React.FC = () => (
  <Alert type='info' icon title='Heading' closable>
    This is a line of important text for alerting purposes
  </Alert>
);

const alertSemantic: SemanticSchema<AlertSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器（与 className 等价）',
      en: 'Outermost wrapper element (equivalent to className)',
      version: '3.10.0',
      example: `<Alert
  classNames={{ root: 'my-alert' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'icon',
      cn: '图标区域',
      en: 'Icon area',
      version: '3.10.0',
      example: `<Alert
  icon
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { width: 20 } }}
/>`,
    },
    {
      key: 'title',
      cn: '标题',
      en: 'Title element',
      version: '3.10.0',
      example: `<Alert
  title="Heading"
  classNames={{ title: 'my-title' }}
  styles={{ title: { fontSize: 16 } }}
/>`,
    },
    {
      key: 'content',
      cn: '内容文本区',
      en: 'Content text area',
      version: '3.10.0',
      example: `<Alert
  classNames={{ content: 'my-content' }}
  styles={{ content: { color: '#333' } }}
>
  Alert message
</Alert>`,
    },
    {
      key: 'close',
      cn: '关闭按钮',
      en: 'Close button',
      version: '3.10.0',
      example: `<Alert
  closable
  classNames={{ close: 'my-close' }}
  styles={{ close: { opacity: 0.6 } }}
/>`,
    },
  ],
  demo: AlertSemanticDemo,
};

export default alertSemantic;
