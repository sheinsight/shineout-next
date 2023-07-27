/**
 * cn - 带图标的下拉菜单
 *    -- content 可以传 ReactNode 来渲染复杂的内容
 * en - Dropdown with icon
 *    -- Content can pass ReactNode to render complex content
 */
import React from 'react';
import { Dropdown } from 'shineout';
import FontAwesome from './Icon';

const menu = new Array(5).fill(null).map((_, index) => ({
  id: `${index}`,
  content: (
    <div>
      <FontAwesome name={'user-o'} /> <span style={{ marginInlineStart: 4 }}>{`item${index}`}</span>
    </div>
  ),
}));

const App: React.FC = () => <Dropdown placeholder='Icon Menu' data={menu} />;

export default App;
