/**
 * cn - 弹出展示
 *    --  设置 shape="line-pop"，children 会通过弹出框展示
 * en - Basic
 *    --  set shape="line-pop"，children will show in a popup
 */

import React, { useState } from 'react';
import { Progress, Button } from 'shineout';

let store = 0;

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleClick = (num = store) => {
    let v = num;
    v += Math.random() * 12;
    if (v >= 100) {
      v = 100;
      setValue(v);
    } else {
      store = v;
      if (store > 100) {
        setValue(100);
        store = 0;
      } else {
        setValue(v);
        setTimeout(handleClick, 320);
      }
    }
  };

  return (
    <div style={{ width: 400 }}>
      <Progress value={value} shape='line-pop'>{`${parseInt(value.toString(), 10)}%`}</Progress>

      <Button mode="outline" onClick={() => handleClick(0)} style={{ marginTop: 24 }}>Start</Button>
    </div>
  );
};

export default App;
