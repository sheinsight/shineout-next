/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 *    -- 如果`onFilter`不返回函数，可根据输入内容自行进行远程查询数据
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';
import { createNestedArray } from '../../tree/__example__/utils';

interface DataItem {
  id: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

const data: DataItem[] = createNestedArray([100, 100, 1]);

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>('');

  const handleFilter = (text: string) => (d: DataItem) => d.id.indexOf(text) > -1;

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        virtual
        width={300}
        multiple
        compressed
        compressedBound={2}
        onFilter={handleFilter}
        mode={1}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node?.id}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
};
