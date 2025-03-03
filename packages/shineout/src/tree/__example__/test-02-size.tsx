/**
 * cn - 尺寸
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - Size
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */

// TODO: size feature is not implemented in shineout
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
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node) => {
    return `node ${node.id}`;
  };

  return (
    <div>
      <Tree data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
