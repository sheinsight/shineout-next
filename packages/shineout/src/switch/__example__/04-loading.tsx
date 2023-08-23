/**
 * cn - 加载中
 *    -- 设置 `loading` 属性可以让 Switch 处于加载状态
 * en - Base
 *    -- Set `loading` property to make Switch loading.
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch loading value />
      <Switch loading />
    </div>
  );
};

export default App;
