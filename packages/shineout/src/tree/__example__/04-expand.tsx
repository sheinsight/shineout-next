/**
 * cn - 控制展开
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - expand
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
 */

import { Tree, Button } from 'shineout';

export default () => {
  const data = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
        },
      ],
    },
    {
      id: '1',
      children: [
        {
          id: '1-0',
        },
      ],
    },
    {
      id: '2',
      children: [
        {
          id: '2-0',
        },
      ],
    },
    {
      id: '3',
      children: [
        {
          id: '3-0',
        },
      ],
    },
    {
      id: '4',
      children: [
        {
          id: '4-0',
        },
      ],
    },
  ];

  const renderItem = (node: any) => {
    return <span>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Button size='small' mode='outline' type='secondary'>
          Expand all
        </Button>
        <Button size='small' mode='outline' type='secondary'>
          Collapse all
        </Button>
      </div>
      <Tree line={false} data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
