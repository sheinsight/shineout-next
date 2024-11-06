/**
 * cn -
 *    -- Input.Number 组件，可以通过鼠标和上下键辅助输入
 *    -- 需要注意在输入的过程中 value 是 string 类型；blur 时会转换为 number 类型
 * en -
 *    -- Input.Number component, can be assisted by mouse and up and down keys to input
 *    -- Note that the value is a string type during input; it will be converted to a number type when blur
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => {

  return <Input.Number width={300} onChange={v => {
    console.log('Input.Number', v);
  }} />
};

export default App;
