/**
 * cn -
 *    -- step 设定为 0 时，只能取 scale 内定义的值
 * en -
 *    -- When the step is set to 0, only the value defined in scale can be taken
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => (
  <Slider
    step={0}
    scale={[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]}
  />
);

export default App;
