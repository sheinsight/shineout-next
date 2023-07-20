/**
 * cn - 多列平铺
 *    -- 设置 columns 属性可以让选项多列平铺
 * en - Multiple columns
 *    -- Set columns property can make the option multi-column tiled.
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(30).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const App: React.FC = () => <Dropdown placeholder='Dropdown' width={500} columns={5} data={menu} />;

export default App;
