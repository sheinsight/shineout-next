/**
 * cn - 自定义文案
 *    -- 自定义开关打开（关闭）时需要显示的文字和图标
 * en - Custom content
 *    -- Customize the text and icon to display when the switch is on (off)
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
    <Switch size='small' defaultValue content={['ON', 'OFF']} />
    <Switch defaultValue content={['ON', 'OFF']} />
    <Switch size='large' defaultValue content={['ON', 'OFF']} />

    <Switch size='small' defaultValue content={['开', '关']} />
    <Switch defaultValue content={['开', '关']} />
    <Switch size='large' defaultValue content={['开', '关']} />
  </div>
);

export default App;
