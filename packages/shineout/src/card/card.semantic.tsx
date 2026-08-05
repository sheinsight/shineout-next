/**
 * Card Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { CardSemanticKey } from '@sheinx/base';
import { Card } from 'shineout';

const CardSemanticDemo: React.FC = () => (
  <Card style={{ width: 360 }}>
    <Card.Header extra='Extra'>Card Title</Card.Header>
    <Card.Body>Card content goes here.</Card.Body>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);

const cardSemantic: SemanticSchema<CardSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Card 最外层容器',
      en: 'Card outermost wrapper element',
      version: '3.10.0',
      example: `<Card
  classNames={{ root: 'my-card' }}
  styles={{ root: { borderRadius: 12 } }}
/>`,
    },
    {
      key: 'header',
      cn: '头部区域容器',
      en: 'Header section container',
      version: '3.10.0',
      example: `<Card
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '16px 24px' } }}
/>`,
    },
    {
      key: 'headerContent',
      cn: '头部标题内容区',
      en: 'Header title content area',
      version: '3.10.0',
      example: `<Card
  classNames={{ headerContent: 'my-title' }}
  styles={{ headerContent: { fontWeight: 600 } }}
/>`,
    },
    {
      key: 'headerExtra',
      cn: '头部额外内容区',
      en: 'Header extra content area',
      version: '3.10.0',
      example: `<Card
  classNames={{ headerExtra: 'my-extra' }}
  styles={{ headerExtra: { color: '#999' } }}
/>`,
    },
    {
      key: 'body',
      cn: '主内容区',
      en: 'Main content area',
      version: '3.10.0',
      example: `<Card
  classNames={{ body: 'my-body' }}
  styles={{ body: { padding: '16px 24px' } }}
/>`,
    },
    {
      key: 'footer',
      cn: '底部区域',
      en: 'Footer section',
      version: '3.10.0',
      example: `<Card
  classNames={{ footer: 'my-footer' }}
  styles={{ footer: { borderTop: '1px solid #f0f0f0' } }}
/>`,
    },
  ],
  demo: CardSemanticDemo,
};

export default cardSemantic;
