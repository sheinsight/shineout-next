/**
 * cn - 提示文字
 *    -- 在 input 上设置的 tip 在 focus 时弹出
 * en - Tip
 *    -- The tip set on the input pops up when focus
 */

import { Input } from 'shineout';

export default () => {
  return <Input placeholder='input something' tip={'please input something'} />;
};
