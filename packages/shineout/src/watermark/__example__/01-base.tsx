/**
 * cn - 基本用法
 *    -- 使用 content 设置水印文本
 * en - Basic
 *    -- Set the watermark text with content
 */
import React from 'react';
import { Watermark } from 'shineout';

export default () => {
  return (
    <Watermark content='Shineout' font={{ color: 'rgba(153, 157, 168, 0.55)' }}>
      <div
        style={{
          height: 240,
          padding: 24,
          background: 'var(--soui-neutral-fill-2)',
          color: 'var(--soui-neutral-text-5)',
        }}
      >
        Basic watermark
      </div>
    </Watermark>
  );
};
