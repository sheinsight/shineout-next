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
    <Watermark content='Shineout'>
      <div
        style={{
          height: 240,
          padding: 24,
          background: '#fafafa',
          color: '#141414',
        }}
      >
        Basic watermark
      </div>
    </Watermark>
  );
};
