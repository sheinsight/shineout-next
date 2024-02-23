/**
 * cn - 自定义文案
 *    -- 自定义开关打开（关闭）时需要显示的文字和图标
 * en - Custom content
 *    -- Customize the text and icon to display when the switch is on (off)
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => (
  <div>
    <Switch defaultValue content={['ON', 'OFF']} />
  </div>
);

export default App;
