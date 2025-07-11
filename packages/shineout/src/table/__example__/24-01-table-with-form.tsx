/**
 * cn - 可编辑行
 *    -- 演示与Form组件结合使用实现可编辑行
 * en - Editable Rows
 *    -- Usage of Table with Form component
 */

import { useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule, Link, Modal, Message, Popover } from 'shineout';

export function ItemWithRequired(props: { children: React.ReactNode; top?: number }) {
  return (
    <div style={{ position: 'relative' }}>
      <span
        style={{
          color: '#EB4242',
          position: 'absolute',
          top: props.top || 0,
          left: -2,
          transform: 'translate(-100%, 0)',
        }}
      >
        *
      </span>
      {props.children}
    </div>
  );
}
interface TableRowData {
  id?: number;
  name?: string;
  age?: string;
}

interface FormTableValues {
  values: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const rules = Rule();

const defaultData = [
  { id: 1, name: 'Tom1', age: '18' },
  { id: 2, name: 'Tom2', age: '28' },
];
export default () => {
  const [edits, setEdits] = useState<boolean[]>([]);
  const [formDatas, setFormDatas] = useState<FormTableValues>({
    values: defaultData,
  });
  const [tableData, setTableData] = useState<FormTableValues>({
    values: defaultData,
  });

  const columns: TableColumnItem[] = [
    { title: 'ID', width: 100, render: (d, index) => <div key={edits[index]?.toString()} style={{ lineHeight: edits[index] ? '32px' : 'auto' }}>{d.id}</div> },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 200,
      render: (d, index) => {
        return edits[index] ? (
          <ItemWithRequired top={5}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Input rules={[rules.required]} name={`values[${index}].name`} />
            </Form.Item>
          </ItemWithRequired>
        ) : (
          d.name
        );
      },
    },
    {
      title: 'Age',
      width: 200,
      render: (d, index) => {
        return edits[index] ? (
          <Form.Item style={{ marginBottom: 0 }}>
            <Input rules={[rules.required]} name={`values[${index}].age`} />
          </Form.Item>
        ) : (
          d.age
        );
      },
    },
    {
      title: 'Operation',
      width: 100,
      render: (d, index) => {
        return edits[index] ? (
          <>
            <Link
              type='primary'
              onClick={() => {
                setEdits(prev => ([
                  ...prev.slice(0, index),
                  !prev[index],
                  ...prev.slice(index + 1),
                ]));
                setTableData({
                  values: tableData.values.map((item, idx) =>
                    idx === index ? { ...item, ...formDatas.values[index] } : item,
                  ),
                });
                Message.success('Data saved successfully');
              }}
              style={{ lineHeight: '32px', marginRight: 8 }}
            >
              Save
            </Link>
            <Link type='primary' style={{ lineHeight: '32px' }}>
              <Popover.Confirm
                title='Sure to cancel?'
                onCancel={() => console.log('cancel')}
                onOk={() => {
                  setEdits(prev => ([
                    ...prev.slice(0, index),
                    !prev[index],
                    ...prev.slice(index + 1),
                  ]));
                }}
              >
              </Popover.Confirm>
              Cancel
            </Link>
          </>
        ) : (
          <>
          <Link
            type='primary'
            onClick={() => {
              setEdits(prev => ([
                ...prev.slice(0, index),
                !prev[index],
                ...prev.slice(index + 1),
              ]));
              setFormDatas({
                values: formDatas.values.map((item, idx) => (idx === index ? { ...d } : item)),
              });
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Link>
          <Link
            type='danger'
          >
            <Popover.Confirm
              title='Sure to delete?'
              onCancel={() => console.log('cancel')}
              onOk={() => {
                const newDatas = tableData.values.filter((item) => item.id !== d.id);
                setTableData({ values: newDatas });
                setFormDatas({ values: newDatas });
              }}
            >
            </Popover.Confirm>
            Delete
          </Link>
          </>
        );
      },
    },
  ];

  return (
    <Form
      value={formDatas}
      onChange={setFormDatas}
      onSubmit={() => console.log('submit:>>', JSON.stringify(formDatas, null, 2))}
      reserveAble
    >
      <div style={{ marginBottom: 12 }}>
        <Button
          type='primary'
          onClick={() => {
            const newDatas = {
              values: [
                ...tableData.values,
                {
                  id: tableData.values.length + 1,
                  name: `Tom${tableData.values.length + 1}`,
                  age: `${(tableData.values.length + 1) * 10 + 8}`,
                },
              ],
            }
            setTableData(newDatas);
            setFormDatas(newDatas);
          }}
        >
          Add
        </Button>

        <Form.Submit
          onClick={() => {
            Modal.info({
              title: 'Form Data in Table',
              content: <pre>{JSON.stringify(formDatas, null, 2)}</pre>,
            });
          }}
        >
          Submit
        </Form.Submit>
      </div>

      <Table data={tableData.values} columns={columns} keygen='id' />
    </Form>
  );
};
