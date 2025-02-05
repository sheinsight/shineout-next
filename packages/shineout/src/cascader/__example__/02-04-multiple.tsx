/**
 * cn -
 *    -- 通过配置 `renderCompressed` 支持自定义折叠内容渲染，大体量数据可自定义优化渲染
 *    -- `renderCompressed` 参数为一个对象，包含 `data` 和 `onRemove` 两个属性，`data` 为折叠内容数据，`onRemove` 为删除事件
 * en -
 *    -- Support custom rendering of compressed content by configuring `renderCompressed`, and customize optimized rendering for large data
 *    -- The `renderCompressed` parameter is an object containing two properties, `data` and `onRemove`, `data` is the compressed content data, and `onRemove` is the delete event
 */
import React, { useState } from 'react';
import { Cascader, Popover, Table, Link, TYPE } from 'shineout';
import { createNestedArray } from '../../tree/__example__/utils';

const d = createNestedArray([100, 100, 20]);

interface TableRowData {
  id: string;
  children: never[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type CascaderProps = TYPE.Cascader.Props<TableRowData, string[]>;

export default () => {
  const [value, setValue] = useState<string[]>();

  const handleChange: CascaderProps['onChange'] = (v) => {
    setValue(v);
  };

  const renderCompressed: CascaderProps['renderCompressed'] = (options) => {
    const { data, onRemove } = options;

    const columns: TableColumnItem[] = [
      {
        render: (item) => <div>node-{item.id}</div>,
      },
      {
        align: 'center',
        width: 60,
        render: (item) => {
          return (
            <Link type='primary' onClick={() => onRemove(item)}>
              删除
            </Link>
          );
        },
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
        +{value ? value.length : ''}
        <Popover position='right-top'>
          <Table
            data={data}
            keygen='id'
            virtual
            columns={columns}
            hideHeader
            width={200}
            style={{maxHeight: 200}}
          />
        </Popover>
      </span>
    );
  };

  const renderItem: CascaderProps['renderItem'] = (item) => {
    return (
      <div style={{ overflow: 'hidden', width: 90, textOverflow: 'ellipsis' }}>node-{item?.id}</div>
    );
  };

  return (
    <div>
      <Cascader
        mode={2}
        value={value}
        onChange={handleChange}
        width={300}
        clearable
        compressed
        virtual
        placeholder='Please select node'
        data={d}
        keygen='id'
        renderResult='id'
        renderItem={renderItem}
        renderCompressed={renderCompressed}
      />
    </div>
  );
};
