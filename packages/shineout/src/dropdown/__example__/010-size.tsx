/**
 * cn - 尺寸
 *    -- 通过 size 设置下拉菜单的尺寸
 * en - Size
 *    -- Set the size of the dropdown menu through size
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(4).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const marginStyle = { marginInlineEnd: 12 };
const App: React.FC = () => (
  <div>
    {['small', 'default', 'large'].map((size: any) => (
      <Dropdown
        outline
        type={'primary'}
        key={size}
        data={menu}
        placeholder='Dropdown'
        size={size}
        style={marginStyle}
      />
    ))}
  </div>
);

export default App;
