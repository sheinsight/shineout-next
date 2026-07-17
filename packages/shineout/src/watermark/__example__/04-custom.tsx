/**
 * cn - 自定义参数
 *    -- 调整水印尺寸、间距、偏移和旋转角度
 * en - Custom geometry
 *    -- Adjust watermark size, gap, offset, and rotation
 */
import React from 'react';
import { Watermark } from 'shineout';

export default () => {
  return (
    <Watermark
      content='Shineout'
      width={112}
      height={28}
      gap={[72, 56]}
      offset={[16, 20]}
      rotate={-16}
      zIndex={20}
      font={{ color: 'rgba(20, 86, 122, 0.2)', fontSize: 14, fontWeight: 600 }}
    >
      <div style={{ height: 240, padding: 24, background: '#fafafa' }}>
        Custom watermark
      </div>
    </Watermark>
  );
};
