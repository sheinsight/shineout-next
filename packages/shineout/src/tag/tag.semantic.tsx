/**
 * Tag Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TagSemanticKey } from '@sheinx/base';
import { Tag } from 'shineout';

const TagSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Tag color='info' onClose>Closable Tag</Tag>
    <Tag color='success'>Simple Tag</Tag>
    <Tag color='warning' shape='rounded' onClose>Rounded</Tag>
  </div>
);

const tagSemantic: SemanticSchema<TagSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Tag 最外层容器',
      en: 'Tag outermost wrapper element',
      version: '3.10.0',
      example: `<Tag
  classNames={{ root: 'my-tag' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'wrapper',
      cn: '内容包装区域',
      en: 'Content wrapper area',
      version: '3.10.0',
      example: `<Tag
  classNames={{ wrapper: 'my-wrapper' }}
  styles={{ wrapper: { padding: '0 8px' } }}
/>`,
    },
    {
      key: 'closeIcon',
      cn: '关闭按钮',
      en: 'Close icon button',
      version: '3.10.0',
      example: `<Tag
  onClose
  classNames={{ closeIcon: 'my-close' }}
  styles={{ closeIcon: { color: 'red' } }}
/>`,
    },
  ],
  demo: TagSemanticDemo,
};

export default tagSemantic;
