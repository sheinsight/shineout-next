/**
 * cn - 调节偏移
 *    -- 设置 `popupGap` 属性可以调节弹出框与目标元素的偏移距离。
 *    -- 带箭头的间距默认是 10px，不带箭头的间距默认是 4px。
 *    -- 最终的间距是默认间距加上 popupGap 的值。
 * en - Offset
 *   -- Set the `popupGap` property to adjust the offset distance between the popup and the target element.
 *   -- The default gap with an arrow is 10px, and the default gap without an arrow is 4px.
 *   -- The final gap is the default gap plus the value of popupGap.
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const style = {
  height: 60,
  padding: 12,
  backgroundColor: '#f7f8f9',
  display: 'flex',
  alignItems: 'center',
};

const App: React.FC = () => {
  return (
    <div style={style}>
      <Button mode='outline'>
        <Popover showArrow={false} popupGap={12}>
          popover content.
        </Popover>
        PopupGap
      </Button>
    </div>
  );
};
export default App;
