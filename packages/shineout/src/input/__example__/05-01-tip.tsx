/**
 * cn - 提示文字
 *    -- 在 Input 上设置的 `tip` 在 focus 时弹出
 * en - Tip
 *    -- The tip set on the input pops up when focus
 */

import { Input } from 'shineout';

export default () => {
  return <Input width={300} placeholder='input something' tip={'please input something here'} />;
};
