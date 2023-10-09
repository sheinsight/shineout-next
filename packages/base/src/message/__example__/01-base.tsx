/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Message } from '@sheinx/base';
import { useAlertStyle, useMessageStyle } from '@sheinx/shineout-style';

export default () => {
  const alertStyle = useAlertStyle();
  return (
    <div>
      <button
        type={'button'}
        onClick={() => {
          Message.success('成功', 3, {
            jssStyle: {
              message: useMessageStyle,
              alert: alertStyle,
            },
          });
        }}
      >
        hhihih
      </button>
    </div>
  );
};
