/**
 * cn - 自定义文案
 *    -- 通过配置 `tip` 属性来自定义文案
 * en - Tip
 *    -- Set the `tip` property to customize the text.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const renderTip = () => {
    return <div style={{ fontSize: 14 }}>This may take a while...</div>;
  };
  return (
    <div style={{ width: 200 }}>
      <Spin name='ring' size={24} tip={renderTip()} />
    </div>
  );
};
