/**
 * cn -
 *    -- 在 Input 上设置的 `info` 也会在 focus 时弹出
 *    -- 当 `info` 为数字时，统计输入字符数，并在超出时显示错误状态
 *    -- 当 `info` 为对象时，可以设置提示信息的位置，参考 Textarea 的 `info` 属性
 * en -
 *    -- The tip set on the input pops up when focus
 *    -- When `info` is a number, count the number of input characters and display an error state when it exceeds
 *    -- When `info` is an object, you can set the position of the prompt information, see the `info` attribute of Textarea
 */

import { Input } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input width={300} placeholder='limit 20 characters' info={20} />

      <Input
        width={300}
        placeholder='custom info text'
        info={(text) => `已输入${text?.length || 0}个字符`}
      />

      <Input
        width={300}
        placeholder='custom info position'
        info={{
          content: 20,
          position: 'bottom-left',
        }}
      />


    </div>
  );
};
