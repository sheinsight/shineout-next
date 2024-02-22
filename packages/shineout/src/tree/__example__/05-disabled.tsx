/**
 * cn - 禁用状态
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - disabled
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
        {
          id: '0-2',
          children: [
            {
              id: '0-2-0',
            },
          ],
        },
      ],
    },
  ];

  const [value, setValue] = useState<TreeProps['value']>([]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const isDisabled: TreeProps['disabled'] = (node) => {
    return node.id === '0-0';
  };

  const handleChange: TreeProps['onChange'] = (keys) => {
    setValue(keys);
  };

  return (
    <div>
      <Tree
        line={false}
        value={value}
        data={data}
        keygen='id'
        mode={0}
        defaultExpanded={['0']}
        onChange={handleChange}
        disabled={isDisabled}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};
