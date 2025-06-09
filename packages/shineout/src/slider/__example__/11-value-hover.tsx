/**
 * cn - 悬浮提示
 *    -- 设置 tipType 为 hover，鼠标悬浮时显示当前值
 * en - HoverTip
 *    -- Set tipType to hover, the current value is displayed when the mouse is hovered
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <div>
  <Slider defaultValue={50} valueTipType='hover' />

  <Slider defaultValue={50} valueTipType='hover' disabled />
</div>;

export default App;
