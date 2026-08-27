/**
 * Empty Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { EmptySemanticKey } from '@sheinx/base';
import { Empty } from 'shineout';

const EmptySemanticDemo: React.FC = () => (
  <Empty />
);

const emptySemantic: SemanticSchema<EmptySemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Empty 最外层容器',
      en: 'Empty outermost wrapper element',
      version: '3.10.0',
      example: `<Empty
  classNames={{ root: 'my-empty' }}
  styles={{ root: { padding: 40 } }}
/>`,
    },
    {
      key: 'icon',
      cn: '图标/图片容器',
      en: 'Icon or image container',
      version: '3.10.0',
      example: `<Empty
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { marginBottom: 16 } }}
/>`,
    },
    {
      key: 'description',
      cn: '描述文字',
      en: 'Description text',
      version: '3.10.0',
      example: `<Empty
  classNames={{ description: 'my-desc' }}
  styles={{ description: { color: '#999' } }}
/>`,
    },
  ],
  demo: EmptySemanticDemo,
};

export default emptySemantic;
