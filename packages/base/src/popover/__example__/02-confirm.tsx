/**
 * cn - 确认
 *    --
 * en - confirm
 *    --
 */
import React from 'react';
import { PopoverConfirm } from '@sheinx/base';
import { useAlertStyle, useButtonStyle, usePopoverStyle } from '@sheinx/shineout-style';

export default () => {
  const popoverStyle = usePopoverStyle();
  const buttonStyle = useButtonStyle();
  const alertStyle = useAlertStyle();
  return (
    <div>
      <button type={'button'}>
        删除
        <PopoverConfirm
          type={'danger'}
          onVisibleChange={console.log}
          jssStyle={{ popover: popoverStyle, button: buttonStyle, alert: alertStyle }}
        >
          确认删除改模块？
        </PopoverConfirm>
      </button>
    </div>
  );
};
