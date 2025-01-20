/**
 * cn - 数字
 *    -- 设置 `type` 为 number，输入时会做一次校验，禁止输入非数字类型字符
 *    -- 设置 `digits` 限制小数位数
 *    -- 设置 `integerLimit` 限制整数位数
 *    -- 设置 `numType` 限制数字格式, 支持 'positive' 和 'non-negative'
 * en - Number
 *    -- Set `type` to number, the input will be verified once when inputting, and non-numeric characters are not allowed to be entered
 *    -- Set `digits` to limit the number of decimal places
 *    -- Set `integerLimit` to limit the number of integers
 *    -- Set `numType` to limit the number format, support 'positive' and 'non-negative'
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 24 };

const App: React.FC = () => (
  <div style={{ width: 300 }}>
    <Input style={style} type='number' placeholder='digits undefined' clearable />
    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />
    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />
    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />
    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' clearable />
    <Input style={style} type='number' integerLimit={3} placeholder='integerLimit 3' clearable />
    <Input
      style={style}
      autoFix
      digits={3}
      type='number'
      placeholder='digits 3; autoFix'
      clearable
    />
    <Input
      style={style}
      numType='positive'
      integerLimit={3}
      type='number'
      placeholder='positive;integerLimit 3'
      clearable
    />
    <Input.Number numType='positive' integerLimit={3} placeholder='positive; integerLimit 3' clearable />
  </div>
);

export default App;
