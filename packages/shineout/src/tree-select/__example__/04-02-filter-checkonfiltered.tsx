/**
 * cn -
 *    -- 开启 `checkOnFiltered` 后，勾选操作仅针对筛选后的数据生效
 * en -
 *    -- When `checkOnFiltered` is enabled, the check operation only applies to filtered data
 */

import { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>('');

  const handleFilter = (text: string) => (d: DataItem) => `node ${d.title}`.indexOf(text) > -1;

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <TreeSelect
      width={300}
      multiple
      onFilter={handleFilter}
      mode={2}
      value={value}
      onChange={handleChange}
      clearable
      keygen='id'
      renderItem={(node) => `node ${node?.title}`}
      data={data}
      placeholder='Please select content'
      highlight
      checkOnFiltered
    />
  );
};
