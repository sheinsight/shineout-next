/**
 * cn - 布局模式
 *    -- 在设置 `tip` 文案后，可以通过配置 `mode` 实现不同的布局模式：horizontal 水平布局、vertical 垂直布局
 * en - Basic
 *    -- After setting the `tip` text, you can use the `mode` property to set the layout mode: horizontal or vertical
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const renderTip = () => {
    return <span style={{ fontSize: 12, fontWeight: 300 }}>Loading...</span>;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ width: 100 }}>
        <Spin name='ring' size={16} mode='vertical' tip={renderTip()} />
      </div>
      <div style={{ width: 100 }}>
        <Spin name='ring' size={16} mode='horizontal' tip={renderTip()} />
      </div>
    </div>
  );
};
