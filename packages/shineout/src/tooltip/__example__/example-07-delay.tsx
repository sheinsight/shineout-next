/**
 * cn - 延迟出现
 *    -- 旧属性 `delay` 即将废弃，请使用 `mouseEnterDelay`
 *    -- 设置 `mouseEnterDelay` 属性后，鼠标移入后将延迟出现组件，单位为毫秒
 *    -- 注意，该属性仅在 `trigger` 为 `hover` 时有效
 * en - Delay
 *    -- The old property `delay` is about to be deprecated, please use `mouseEnterDelay`.
 *    -- When the `mouseEnterDelay` property is set, the component will appear after the mouse enters, in milliseconds.
 *    -- Note that this property is only valid when `trigger` is `hover`.
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='1000ms delay' trigger='hover' mouseEnterDelay={1000}>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  </div>
);
export default App;
