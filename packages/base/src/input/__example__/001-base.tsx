/**
 * cn - 基本用法
 *    --基础 Input 用法
 * en - Base
 *    --Base Input
 */

import React from 'react';
import { Input } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';
const jssStyle = {
  input: useInputStyle,
};

export default () => {
  return (
    <div>
      <Input
        jssStyle={jssStyle}
        onChange={(v) => {
          console.log('input onchange', v);
        }}
        clearable
        placeholder='Username'
      />
    </div>
  );
};
