/**
 * cn - 禁用状态
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - disabled
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
 */

import { useState } from 'react';
import { Tree } from 'shineout';

export default () => {
  const data = [
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

  const [value, setValue] = useState([]);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const isDisabled = (node: any) => {
    return node.id === '0-0';
  };

  const handleChange = (keys: any) => {
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
