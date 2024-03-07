/**
 * cn - 触发方式
 *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
 * en - Trigger
 *    -- By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  { content: 'America' },
  { content: 'Germany' },
  { content: 'United Kingdom' },
  { content: 'France' },
  { content: 'Russia' },
];

const App: React.FC = () => (
  <>
    <Dropdown trigger='click' placeholder='Click me' data={menu} />
    <Dropdown trigger='hover' placeholder='Hover me' data={menu} />
  </>
);

export default App;
