/**
 * cn - 不重复选项
 *    -- 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项
 * en - No Repeat
 *    -- By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value.
 */

import React from 'react';
import { Rate } from 'shineout';

const LetterRate = Rate(['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E']);
const NumberRate = Rate(['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']);

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <LetterRate repeat={false} defaultValue={3} />
    <NumberRate repeat={false} defaultValue={3} />
  </div>
);

export default App;
