/**
 * cn -
 *    -- 设置 `leafIcon` 属性为true，显示默认的叶子节点图标
 *    -- 也可以设置 `leafIcon` 属性为函数，返回自定义的叶子节点图标
 * en -
 *    -- Set the `expandIcons` property to configure custom expand/collapse icons
 *    -- You can also set the `leafIcon` property to a function to return a custom leaf node icon
 */

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
              children: [
                {
                  id: '0-0-0-0',
                },
                {
                  id: '0-0-0-1',
                },
              ],
            },
            {
              id: '0-0-1',
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
    {
      id: '1',
      children: [
        {
          id: '1-0',
          children: [
            {
              id: '1-0-0',
            },
          ],
        },
        {
          id: '1-1',
          children: [
            {
              id: '1-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree
        defaultExpandAll
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
        leafIcon
      />
    </div>
  );
};
