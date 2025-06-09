/**
 * cn - 自定义渲染
 *    -- content 可以传 ReactNode 来渲染复杂的内容，包括图标
 * en - Dropdown with icon
 *    -- Content can pass ReactNode to render complex content
 */
import React from 'react';
import { Dropdown } from 'shineout';
import FontAwesome from './Icon';

const menu = new Array(5).fill(null).map((_, index) => ({
  id: `${index}`,
  content: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesome name={'user-o'} style={{color: '#666C7C', width: 14}} /> <span style={{ marginInlineStart: 8 }}>{`item${index}`}</span>
    </div>
  ),
}));

const App: React.FC = () => <Dropdown placeholder='Icon Menu' data={menu} />;

export default App;
