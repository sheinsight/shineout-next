/**
 * Image Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ImageSemanticKey } from '@sheinx/base';
import { Image } from 'shineout';

const ImageSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Image
      width={200}
      height={150}
      fit="fit"
      src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      shape='rounded'
      placeholder={<div style={{ textAlign: 'center', lineHeight: '150px' }}>Loading...</div>}
    />
    <Image
      width={200}
      height={150}
      src='invalid-url-for-error-state'
      shape='rounded'
    />
  </div>
);

const imageSemantic: SemanticSchema<ImageSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Image 最外层容器',
      en: 'Image outermost wrapper element',
      version: '3.10.0',
      example: `<Image
  classNames={{ root: 'my-image' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'img',
      cn: '图片内容（img 元素或 backgroundImage 容器）',
      en: 'Image content (img element or backgroundImage container)',
      version: '3.10.0',
      example: `<Image
  classNames={{ img: 'my-img' }}
  styles={{ img: { objectFit: 'cover' } }}
/>`,
    },
    {
      key: 'placeholder',
      cn: '加载中占位区域',
      en: 'Loading placeholder area',
      version: '3.10.0',
      example: `<Image
  classNames={{ placeholder: 'my-placeholder' }}
  styles={{ placeholder: { background: '#f5f5f5' } }}
/>`,
    },
    {
      key: 'error',
      cn: '加载失败区域',
      en: 'Error state area',
      version: '3.10.0',
      example: `<Image
  classNames={{ error: 'my-error' }}
  styles={{ error: { background: '#fff2f0' } }}
/>`,
    },
  ],
  demo: ImageSemanticDemo,
};

export default imageSemantic;
