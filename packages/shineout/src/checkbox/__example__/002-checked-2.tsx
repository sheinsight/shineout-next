/**
 * cn - 全选/半选
 *    -- 通过设置 checked = 'indeterminate' 属性，可以实现半选效果。
 * en - Check all
 *    -- Set checked = 'indeterminate' to achieve half-check effect.
 */
import React, { useState } from 'react';
import { Checkbox } from 'shineout';

const data = ['Option1', 'Option2', 'Option3'];
const getChecked = (value: string[], num: number) => {
  if (value.length === num) return true;
  if (value.length === 0) return false;
  return 'indeterminate';
};

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      <Checkbox
        checked={getChecked(value, data.length)}
        onChange={(v) => {
          if (v) {
            setValue(data);
          } else {
            setValue([]);
          }
        }}
      >
        {getChecked(value, data.length) === true ? 'UnCheckAll' : 'CheckAll'}
      </Checkbox>
      <Checkbox.Group
        style={{ marginTop: 12 }}
        data={data}
        keygen
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default App;
