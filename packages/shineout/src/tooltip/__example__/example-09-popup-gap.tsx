/**
 * cn - 偏移量
 *    -- 设置 `popupGap` 属性可以设置弹出层与目标元素的间距
 * en - Popup gap
 *    -- Set the `popupGap` property to set the offset between the pop-up layer and the target element
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <Tooltip tip='Tip message has no arrow.' popupGap={20}>
    <Button type='primary'>hover me</Button>
  </Tooltip>
);
export default App;
