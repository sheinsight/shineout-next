/**
 * cn - 自定义列表布局
 *    -- 通过设置`renderOptionList`可以自定义列表内容，并将列表实例抛出
 *    -- 当数据为空时，`list` 参数为 `null`，可通过第二个参数 `info.empty` 判断是否为空状态
 *    -- 可将`emptyText`设置为 false 禁用内置空态渲染，在`renderOptionList`中自行处理空内容
 * en - Custom render option list
 *    -- Set `renderOptionList` to customize the list content
 *    -- When data is empty, `list` is `null`. You can use `info.empty` from the second parameter to determine the empty state
 *    -- Set `emptyText` to false to disable the built-in empty rendering, and handle empty content in `renderOptionList`
 */
import { useState } from 'react';
import { TreeSelect, Checkbox } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: 'Node 1',
    children: [
      {
        id: '1-1',
        title: 'Node 1-1',
        children: [
          { id: '1-1-1', title: 'Node 1-1-1' },
          { id: '1-1-2', title: 'Node 1-1-2' },
        ],
      },
      { id: '1-2', title: 'Node 1-2' },
    ],
  },
  {
    id: '2',
    title: 'Node 2',
    children: [
      { id: '2-1', title: 'Node 2-1' },
      { id: '2-2', title: 'Node 2-2' },
    ],
  },
  { id: '3', title: 'Node 3', children: [{ id: '3-1', title: 'Node 3-1' }] },
];

// 获取所有节点的 id
const getAllIds = (nodes: DataItem[]): string[] => {
  const ids: string[] = [];
  const traverse = (items: DataItem[]) => {
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children) {
        traverse(item.children);
      }
    });
  };
  traverse(nodes);
  return ids;
};

const allIds = getAllIds(data);

export default () => {
  const [value1, setValue1] = useState<string[]>([]);

  const selectedCount = value1?.length || 0;
  const checkboxChecked: boolean | 'indeterminate' =
    selectedCount === allIds.length ? true : selectedCount > 0 ? 'indeterminate' : false;

  const handleSelectAll = (checked?: boolean) => {
    if (checked) {
      setValue1(allIds);
    } else {
      setValue1([]);
    }
  };

  return (
    <TreeSelect
      width={300}
      value={value1}
      onChange={(v) => setValue1(v || [])}
      clearable
      multiple
      compressed
      keygen='id'
      renderItem={(node) => node.title}
      data={data}
      placeholder='With select all and count'
      renderOptionList={(list) => (
        <div>
          <div
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid var(--soui-neutral-border-2,#CCCFD7)',
              backgroundColor: '#fafafa',
            }}
          >
            <Checkbox checked={checkboxChecked} onChange={handleSelectAll}>
              Select All
            </Checkbox>
          </div>
          <div>{list}</div>
          <div
            style={{
              padding: '8px 12px',
              borderTop: '1px solid var(--soui-neutral-border-2,#CCCFD7)',
              backgroundColor: '#fafafa',
              fontSize: '12px',
              color: '#666',
            }}
          >
            Selected: {selectedCount} / {allIds.length}
          </div>
        </div>
      )}
    />
  );
};
