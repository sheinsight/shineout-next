/**
 * cn - 基本用法
 *    --基础 Input 用法
 * en - Base
 *    --Base Input
 */

import React from 'react';
import { Input } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';

export default () => {
  const style = useInputStyle();
  return (
    <div>
      <Input
        jssStyle={{ input: style }}
        onChange={(v) => {
          console.log('input onchange', v);
        }}
        clearable
        placeholder='Username'
      />
    </div>
  );
};
