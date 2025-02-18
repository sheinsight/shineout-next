/**
 * cn - 多选
 *    -- 设置`multiple`属性允许开启多选功能
 * en - Multiple
 *    -- Set `multiple` to enable multiple selection
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const [value, setValue] = React.useState<string[]>();
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        multiple
        data={data}
        keygen
        value={value}
        onChange={(v) => setValue(v)}
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};
