/**
 * Skeleton Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { SkeletonSemanticKey } from '@sheinx/base';
import { Skeleton } from 'shineout';

const SkeletonSemanticDemo: React.FC = () => (
  <Skeleton loading animation image button style={{ width: 400 }} />
);

const skeletonSemantic: SemanticSchema<SkeletonSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Skeleton 最外层容器',
      en: 'Skeleton outermost wrapper element',
      version: '3.10.0',
      example: `<Skeleton
  classNames={{ root: 'my-skeleton' }}
  styles={{ root: { padding: 16 } }}
/>`,
    },
    {
      key: 'image',
      cn: '图片/头像占位区',
      en: 'Image/avatar placeholder area',
      version: '3.10.0',
      example: `<Skeleton
  classNames={{ image: 'my-image' }}
  styles={{ image: { width: 64, height: 64 } }}
/>`,
    },
    {
      key: 'text',
      cn: '文本行区域',
      en: 'Text lines area',
      version: '3.10.0',
      example: `<Skeleton
  classNames={{ text: 'my-text' }}
  styles={{ text: { marginTop: 8 } }}
/>`,
    },
    {
      key: 'button',
      cn: '按钮占位区',
      en: 'Button placeholder area',
      version: '3.10.0',
      example: `<Skeleton
  classNames={{ button: 'my-button' }}
  styles={{ button: { marginTop: 16 } }}
/>`,
    },
  ],
  demo: SkeletonSemanticDemo,
};

export default skeletonSemantic;
