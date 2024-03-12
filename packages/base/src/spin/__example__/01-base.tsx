/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Spin } from '@sheinx/base';
import { useSpinStyle } from '@sheinx/shineout-style';

const jssStyle = {
  spin: useSpinStyle,
};
export default () => {
  const renderTip = () => {
    return <div>hhhh</div>;
  };

  return (
    <div>
      <Spin jssStyle={jssStyle} tip={renderTip()}>
        <div style={{ width: 200, height: 200, background: '#000' }}></div>
      </Spin>
    </div>
  );
};
