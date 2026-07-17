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
      content={[
        { text: 'Shineout', font: { color: 'rgba(0, 0, 0, 0.18)', fontSize: 18 } },
        {
          text: 'Watermark',
          font: { color: 'rgba(206, 32, 41, 0.22)', fontSize: 12, fontWeight: 600 },
        },
      ]}
    >
      <div style={{ height: 240, padding: 24, background: '#fafafa' }}>
        Multi-line watermark
      </div>
    </Watermark>
  );
};
