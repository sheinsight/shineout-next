/**
 * cn - 图片水印
 *    -- 使用 image 设置图片水印，content 可在图片加载失败时作为回退内容
 * en - Image
 *    -- Set an image watermark and use content as a fallback when loading fails
 */
import React from 'react';
import { Watermark } from 'shineout';

const image =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png';

export default () => {
  return (
    <Watermark
      image={image}
      content='Shineout'
      width={72}
      height={48}
      font={{ color: 'rgba(153, 157, 168, 0.55)' }}
    >
      <div
        style={{
          height: 240,
          padding: 24,
          background: 'var(--soui-neutral-fill-2)',
          color: 'var(--soui-neutral-text-5)',
        }}
      >
        Image watermark
      </div>
    </Watermark>
  );
};
