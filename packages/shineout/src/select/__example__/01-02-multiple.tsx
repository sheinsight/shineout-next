/**
 * cn - 多选
 *    -- 设置`multiple`属性允许开启多选功能
 * en - Multiple
 *    -- Set `multiple` to enable multiple selection
 */
import React, { useEffect } from 'react';
import { Select } from 'shineout';

export default () => {
  const [value, setValue] = React.useState<string[]>();
  const [selectOpen, setSelectOpen] = React.useState(false);
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

  useEffect(() => {
    if(value?.length === 0){
      setSelectOpen(true);
    }
  }, [value]);

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
        open={selectOpen}
        onCollapse={(open) => setSelectOpen(open)}
      />
    </div>
  );
};
