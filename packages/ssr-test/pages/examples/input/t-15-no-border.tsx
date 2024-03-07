/**
 * cn - border
 *    -- 设置 `border` false ，Input 组件将不再显示边框
 * en - Borderless mode
 *    -- Set `border` false, the Input component will no longer display the border
 */

import { Input } from 'shineout';

export default () => {
  return (
    <Input
      style={{ backgroundColor: '#eee' }}
      width={300}
      placeholder='input something'
      border={false}
    />
  );
};
