/**
 * cn -
 *    -- 基础级联选择器的用法
 * en -
 *    -- Basic usage of cascader
 */
import React, { useState } from 'react';
import { Cascader, Popover, Table, Button, TYPE } from 'shineout';
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
        render: (item) => {
          return (
            <Button size='small' type='primary' mode='text' onClick={() => onRemove(item)}>
              删除
            </Button>
          );
        },
      },
    ];

    return (
      <span
        style={{
          fontSize: 10,
          color: '#fff',
          margin: '2px 0',
          borderRadius: 4,
          padding: '0 4px',
          background: 'var(--soui-brand-6)',
        }}
      >
        +{value ? value.length : ''}
        <Popover position='right-top'>
          <div style={{ width: 200 }}>
            <Table
              data={data}
              keygen='id'
              virtual
              columns={columns}
              hideHeader
              height={200}
            ></Table>
          </div>
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
        compressedBound={2}
        placeholder='Please select city'
        data={d}
        keygen='id'
        renderResult='id'
        renderItem={renderItem}
        renderCompressed={renderCompressed}
      />
    </div>
  );
};
