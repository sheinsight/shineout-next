/**
 * cn - 自定义渲染合并内容
 *    -- 通过配置 `renderCompressed` 支持自定义折叠内容渲染，大体量数据可自定义优化渲染
 *    -- `renderCompressed` 参数为一个对象，包含 `data` 和 `onRemove` 两个属性，`data` 为折叠内容数据，`onRemove` 为删除事件
 *    -- 该示例演示使用Table组件的虚拟列表特性渲染大体量的结果
 * en - Custom rendering of compressed content
 *    -- Support custom rendering of compressed content by configuring `renderCompressed`, and customize optimized rendering for large data
 *    -- The `renderCompressed` parameter is an object containing two properties, `data` and `onRemove`, `data` is the compressed content data, and `onRemove` is the delete event
 *    -- This example demonstrates using the virtual list feature of the Table component to render large amounts of results
 */
import React, { useState } from 'react';
import { Select, Popover, Table, Link, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 8px',
      '&:hover': {
        borderRadius: 2,
        backgroundColor: 'var(---Neutral-fill-2-, #F4F5F8)',
      },
    },
    table: {
      borderRadius: 4,
      overflow: 'hidden',
      '& td': {
        padding: '0 8px',
        border: 'none !important',
      },
      '& tr:first-child td': {
        paddingTop: '8px',
      },
      '& tr:last-child td': {
        paddingBottom: '8px',
      },
      '& [data-soui-role="scroll"]': {
        scrollbarColor: '#c0c0c0 transparent',
      },
    },
  },
);

interface DataItem {
  id: string;
  name: string;
  height: number;
}
type SelectProps = TYPE.Select.Props<DataItem, string>;
type TableColumnItem = TYPE.Table.ColumnItem<DataItem>;

const data: DataItem[] = [];

for (let i = 0; i < 10000; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
    height: Math.floor(Math.random() * 100) + 34,
  });
}

export default () => {
  const [value, setValue] = useState<DataItem[]>(data);
  const classNames = useStyles();

  const handleChange = (v: DataItem[]) => {
    setValue(v);
  };

  const renderItem: SelectProps['renderItem'] = (d) => d.name;

  const renderCompressed: SelectProps['renderCompressed'] = (options) => {
    const { data, onRemove } = options;

    const columns: TableColumnItem[] = [
      {
        render: (item) => (
          <div className={classNames.item}>
            <span>node-{item.id}</span>
            <Link type='primary' onClick={() => onRemove(item)}>
              删除
            </Link>
          </div>
        ),
      },
    ];

    return (
      <span
        style={{
          fontSize: 12,
          color: '#fff',
          margin: '2px 0',
          borderRadius: 4,
          padding: '0 4px',
          background: 'var(--soui-brand-6)',
        }}
      >
        +{data ? data.length : ''}
        <Popover position='bottom'>
          <Table
            data={data}
            keygen='id'
            virtual
            columns={columns}
            hideHeader
            width={200}
            hover={false}
            style={{ maxHeight: 160 }}
            className={classNames.table}
          />
        </Popover>
      </span>
    );
  };

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        multiple
        compressed
        value={value}
        onChange={handleChange}
        compressedBound={2}
        renderCompressed={renderCompressed}
        placeholder='Static lineHeight'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};
