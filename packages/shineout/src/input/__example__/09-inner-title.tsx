/**
 /**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Input innerTitle='Small title' clearable size={'small'} placeholder='input something' />
    <Input innerTitle='Medium Title' clearable placeholder='input something' />
    <Input innerTitle='Large Title' clearable size={'large'} placeholder='input something' />
  </div>
);

export default App;
