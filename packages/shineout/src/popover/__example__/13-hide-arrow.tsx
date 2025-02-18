/**
 * cn - 不带箭头
 *    -- 设置 `showArrow` 为 false，不显示箭头。
 *    -- 不带箭头的问题提示没有明确指向性。常用于不需要针对性提示的场景中。
 * en - Hide arrow
 *    -- Set `showArrow` to false to hide the arrow.
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => {
  return (
    <Button mode="outline">
      <Popover showArrow={false}>
        This is some notice content.
      </Popover>
      Text prompt without arrow
    </Button>
  );
};
export default App;
