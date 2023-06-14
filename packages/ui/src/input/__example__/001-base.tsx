/**
 * cn - 基本用法
 *    --基础 Input 用法
 * en - Base
 *    --Base Input
 */

import React from 'react';
import { Input } from '@sheinx/ui';
import { useInputStyle } from '@sheinx/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input
        jssStyle={jssStyle}
        onChange={(v) => {
          console.log('input onchange', v);
        }}
        clearable
        placeholder='Username'
        status={'error'}
      />
    </div>
  );
};
