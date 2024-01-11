/**
 * cn - 动态进度条
 *    -- value 变更时动画效果演示
 * en - Animation
 *    -- The animation for changing value.
 */
import React, { useState } from 'react';
import { Button, Progress } from 'shineout';

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
    <div>
      <div>
        <Progress style={{ width: 400 }} value={value}>
          <div style={{ width: 50 }}>{`${value.toFixed(0)}%`}</div>
        </Progress>
      </div>
      <div style={{ marginTop: 24 }}>
        <Progress shape='circle' type='success' value={value}>
          {`${value.toFixed(0)}%`}
        </Progress>
      </div>

      <Button onClick={() => handleClick(0)} style={{ marginTop: 24 }}>
        Start
      </Button>
    </div>
  );
};

export default App;
