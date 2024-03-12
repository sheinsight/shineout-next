/**
 * cn - 渐变色
 *    -- 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色
 * en - Gradient
 *    -- Gradient color can be set when color is an object, recommended only in two colors
 */
import React from 'react';
import { Progress } from 'shineout';

const blue = '#7949FF';
const green = '#19A9FA';

const App: React.FC = () => (
  <div style={{ width: 400 }}>
    <Progress
      value={40}
      color={{
        '0%': green,
        '100%': blue,
      }}
    >
      40%
    </Progress>
    <br />
    <Progress
      value={75}
      color={{
        from: green,
        to: blue,
      }}
      shape='line-inner'
    >
      75%
    </Progress>
    <br />
    <Progress
      value={60}
      color={{
        '0%': green,
        '100%': blue,
      }}
      shape='circle'
    >
      60%
    </Progress>
  </div>
);

export default App;
