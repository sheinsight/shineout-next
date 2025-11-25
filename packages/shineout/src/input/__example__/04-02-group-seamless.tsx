/**
 * cn -
 *    -- 设置 `seamless` 属性开启：组合到一起的组件边框无缝衔接
 * en -
 *    -- Set the `seamless` property to enable: the borders of the components combined together are seamlessly connected
 */

import React from 'react';
import { Input, Select, DatePicker, Button } from 'shineout';

const style: React.CSSProperties = { width: 300 };

const App: React.FC = () => (
  <div>
    <Input.Group style={style} seamless>
      <Select keygen data={['Option1', 'Option2']} style={{width: 100, flex: 'none'}} defaultValue='Option1' />
      <Input placeholder='please enter' />
    </Input.Group>
  </div>
);

export default App;
