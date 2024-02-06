/**
 * cn - 尺寸
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - Size
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
 */

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
      ],
    },
  ];

  const renderItem = (node: any) => {
    return `node ${node.id}`;
  };

  return (
    <div>
      <Tree data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
