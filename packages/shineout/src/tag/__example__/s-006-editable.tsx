/**
 * cn - 可编辑标签
 *    -- 通过设置 `onCompleted` 属性开启编辑模式，编辑完成后会调用该函数，参数为编辑后的值。
 * en - onCompleted
 *    -- Set the `onCompleted` property to enable edit mode, and the function will be called after editing is completed, and the parameter is the edited value.
 */

import { useState } from 'react';
import { Tag } from 'shineout';
export default () => {
  const [value, setValue] = useState('abc');

  return (
    <div>
      <Tag
        onCompleted={(val) => {
          setValue(val);
        }}
        onClose={() => {
          console.log('close');
        }}
      >
        {value}
      </Tag>
    </div>
  );
};
