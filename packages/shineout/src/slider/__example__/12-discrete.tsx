/**
 * cn - 离散模式
 *    -- 设置 `discrete` 属性后，拖拽时滑块会实时对齐到步长值，而不是松开鼠标后才对齐
 * en - Discrete Mode
 *    -- When `discrete` is set, the slider snaps to step values during dragging instead of after releasing the mouse
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => (
  <div>
    <div style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 8 }}>Normal mode (default):</div>
      <Slider step={5} defaultValue={50} />
    </div>
    <div>
      <div style={{ marginBottom: 8 }}>Discrete mode:</div>
      <Slider step={5} defaultValue={50} discrete />
    </div>
  </div>
);

export default App;
