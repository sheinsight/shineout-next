/**
 * cn - 带输入（deprecated）
 *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容
 * en - Inputable
 *    -- Set the inputable property to true can show the input box and the return value is the value of the input box.
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <Checkbox inputable onChange={console.log}>
    more...
  </Checkbox>
);

export default App;
