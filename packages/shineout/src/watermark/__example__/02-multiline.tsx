/**
 * cn - 多行水印
 *    -- 使用数组创建多行水印，并为每行设置独立字体样式
 * en - Multiple lines
 *    -- Use an array for multiple lines with per-line font styles
 */
import React from 'react';
import { Watermark } from 'shineout';

export default () => {
  return (
    <Watermark
      font={{ color: 'rgba(153, 157, 168, 0.55)' }}
      content={[
        { text: 'Shineout', font: { fontSize: 18 } },
        {
          text: 'Watermark',
          font: { color: 'rgba(206, 32, 41, 0.55)', fontSize: 12, fontWeight: 600 },
        },
      ]}
    >
      <div
        style={{
          height: 240,
          padding: 24,
          background: 'var(--soui-neutral-fill-2)',
          color: 'var(--soui-neutral-text-5)',
        }}
      >
        Multi-line watermark
      </div>
    </Watermark>
  );
};
