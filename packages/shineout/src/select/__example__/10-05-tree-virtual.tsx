/**
 * cn - 树形数据虚拟列表
 *    -- 通过设置 `virtual` 开启虚拟列表，适用于超大数据量场景
 * en - Tree data virtual list
 *    -- Set `virtual` to enable virtual list, suitable for large data scenarios
 */
import React from 'react';
import { Select, TYPE } from 'shineout';
import {createNestedArray} from '../../tree/__example__/utils'

type SelectProps = TYPE.Select.Props<DataItem, string>;

type DataItem = {
  id: string;
  children?: DataItem[];
};

const bigTreeData: DataItem[] = createNestedArray([10, 10, 10]);

export default () => {

  const handleFilter: SelectProps['onFilter'] = (text) => (d) => {
    return d.id.indexOf(text) >= 0;
  };

  const renderItem: SelectProps['renderItem'] = (d) => d.id;

  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  return (
    <div>
      <Select
        width={300}
        childrenKey='children'
        treeData={bigTreeData}
        virtual
        keygen='id'
        format='id'
        onFilter={handleFilter}
        placeholder='Select Color'
        prediction={prediction}
        renderItem={renderItem}
        clearable
        defaultExpandAll
      />
    </div>
  );
};
