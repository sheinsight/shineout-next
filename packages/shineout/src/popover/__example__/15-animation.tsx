/**
 * cn - 动画
 *    -- 设置 `animation` 为 false，关闭动画效果。也可以通过 `setConfig({ popover: { animation: false } })` 全局配置所有 Popover 的动画效果
 * en - Animation
 *    -- Set `animation` to false to disable animation. You can also use `setConfig({ popover: { animation: false } })` to globally configure animation for all Popovers
 */
import React from 'react';
import { Button, Popover, Switch } from 'shineout';

export default () => {
  const [animation, setAnimation] = React.useState(true);
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Switch value={animation} onChange={setAnimation} />
        <span style={{ marginLeft: 8 }}>Enable Animation</span>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button mode='outline'>
          Hover me (controlled)
          <Popover animation={animation}>
            This popover's animation is controlled by the switch above.
          </Popover>
        </Button>
        <Button mode='outline'>
          Always with animation
          <Popover animation={true}>
            This popover always has animation enabled.
          </Popover>
        </Button>
        <Button mode='outline'>
          Always without animation
          <Popover animation={false}>
            This popover always has animation disabled.
          </Popover>
        </Button>
      </div>
    </>
  );
};
