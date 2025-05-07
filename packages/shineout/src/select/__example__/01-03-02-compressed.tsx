/**
 * cn - 合并选项去重
 *    -- 当`compressed`属性值为 "no-repeat" 时，合并的选项中不会出现结果框中的重复内容
 * en - Compressed no-repeat
 *    -- When the value of the `compressed` property is 'no-repeat', the repeated content in the merged options will not appear in the result box
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        defaultValue={data}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
        compressed='no-repeat'
        clearable
      />
    </div>
  );
};
