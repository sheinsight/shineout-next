/**
 * cn - 无边框模式
 *    -- 开启 border 属性后，Input 组件将不再显示边框。
 * en - Borderless mode
 *    -- After enabling the border attribute, the Input component will no longer display a border.
 */

import { Input } from 'shineout';

export default () => {
  return <Input placeholder='input something' border={false} />;
};
