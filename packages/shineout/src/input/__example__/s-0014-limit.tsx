/**
 * cn - 输入限制
 *    -- 通过设置 min（最小值）、 max（最大值）、 maxLength（最大长度）来限制 Input 组件的输入内容。
 * en - Input restriction
 *    -- Set min (minimum value), max (maximum value), and maxLength (maximum length) to restrict the input content of the Input component.
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 12 };

const App: React.FC = () => {
  return (
    <div>
      <Input.Group style={style}>
        <b className='min'>min</b>
        <Input.Number placeholder='100' min={100} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='max'>max</b>
        <Input.Number placeholder='200' max={200} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='maxLength'>maxLength</b>
        <Input placeholder='5' maxLength={5} step={3} />
      </Input.Group>
    </div>
  );
};

export default App;
