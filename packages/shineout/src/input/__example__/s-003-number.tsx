/**
 * cn - 数字数据
 *    -- 设置 type 属性为 number 后，将支持数字数据的处理。通过设置 numType、integerLimit、autoFix、digits 属性来定制不同的数值处理结果。
 * en - Numerical data
 *    -- After setting the type attribute to "number", it enables the handling of numerical data. You can customize different numerical processing results by using the numType, integerLimit, autoFix, and digits attributes.
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 12 };

const App: React.FC = () => (
  <div style={{ width: 300 }}>
    <Input style={style} type='tel' placeholder='digits undefined' />
    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />
    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />
    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />
    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' />
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
    />
    <Input.Number numType='positive' integerLimit={3} placeholder='positive; integerLimit 3' />
  </div>
);

export default App;
