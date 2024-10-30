/**
 * cn - 动态加载
 *    -- 树形数据用法下，设置 `loader`后支持动态加载子节点数据;
 *    -- 备注：`column.treeColumnsName` 对应的字段(该例子中是children)未定义时视为可以动态加载节点，开启该节点的加载图标，点击图标触发 `loader` 函数，当children 为 null 或者长度为 0 视为叶子节点；
 * en -
 *    -- Set loader, support dynamic loading of child nodes
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
interface TableRowData {
  id: string;
  title: string;
  children?: TableRowData[] | null;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const initialData: TableRowData[] = [
  {
    id: '1',
    title: 'Can Expand to load more1',
  },
  {
    id: '2',
    title: 'Can Expand to load more2',
  },
  {
    id: '3',
    title: 'Can\'t Expand to load more3, cause children.length === 0',
    children: [],
  },
  {
    id: '4',
    title: 'Can\'t Expand to load more4, cause children is null',
    children: null,
  },
];

const updateTreeData = (list: TableRowData[], key: React.Key, children: TableRowData[]): TableRowData[] =>
  list.map((node) => {
    if (node.id === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const columns: TableColumnItem[] = [
  {
    title: 'Title',
    render: 'title',
    width: 300,
    treeIndent: 24,
    treeColumnsName: 'children',
  },
  {
    title: 'Id',
    render: 'id',
    width: 300,
  },
];

const App: React.FC = () => {
  const [treeData, setTreeData] = useState(initialData);

  const onLoadData = (dataItem: TableRowData) => {
    return new Promise<void>((resolve) => {
      if (dataItem?.children && dataItem?.children?.length > 0) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, dataItem?.id, [
            { title: 'Child Node', id: `${dataItem?.id}-0` },
            { title: 'Child Node', id: `${dataItem?.id}-1` },
          ]),
        );

        resolve();
      }, 3000);
    })
  };

  return (
    <Table
      bordered
      keygen='id'
      columns={columns}
      data={treeData}
      loader={onLoadData}
    />
  );
};

export default App;
