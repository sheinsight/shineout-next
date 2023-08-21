/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Popover } from '@sheinx/base';
import { usePopoverStyle } from '@sheinx/shineout-style';

export default () => {
  const popoverStyle = usePopoverStyle();
  return (
    <div>
      <button type={'button'} style={{ background: 'red' }}>
        哈哈哈哈哈
        <Popover onVisibleChange={console.log} jssStyle={{ popover: popoverStyle }}>
          嘿嘿嘿
        </Popover>
      </button>
    </div>
  );
};
