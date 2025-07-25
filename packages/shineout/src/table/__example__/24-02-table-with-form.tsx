/**
 * cn - 可编辑单元格
 *    -- 演示与Form组件结合使用实现可编辑单元格
 * en - Editable Cells
 *    -- Demonstrates the use of Form component to implement editable cells in a table
 */

import { useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule, Link, Modal, Message, Popover } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    cell: {
      cursor: 'pointer',
      lineHeight: '32px',
      height: 32,
      padding: '0 8px',
      borderRadius: 4,
      border: '1px solid transparent',
      '&:hover': {
        borderColor: 'var(--soui-brand-6,#197AFA)',
      },
    },
  },
  { name: 'table-editable' },
);

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

function EditableCell({ value, onEdit }: { value?: string; onEdit: () => void }) {
  const classes = useStyles();
  return (
    <div onClick={onEdit} className={classes.cell}>
      {value}
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
    { title: 'ID', width: 100, render: (d) => <div style={{ lineHeight: '32px' }}>{d.id}</div> },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 200,
      render: (d, index) => {
        return edits[index] ? (
          <ItemWithRequired top={5}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Input
                rules={[rules.required]}
                name={`values[${index}].name`}
                autoFocus
                onBlur={(e) => {
                  setEdits((prev) => [
                    ...prev.slice(0, index),
                    !prev[index],
                    ...prev.slice(index + 1),
                  ]);
                  setTableData({
                    values: tableData.values.map((item, i) =>
                      i === index ? { ...item, name: (e.target as any).value } : item,
                    ),
                  });

                  Message.success('Data saved successfully');
                }}
              />
            </Form.Item>
          </ItemWithRequired>
        ) : (
          <EditableCell
            value={d.name}
            onEdit={() => {
              setEdits((prev) => [...prev.slice(0, index), !prev[index], ...prev.slice(index + 1)]);
            }}
          />
        );
      },
    },
    {
      title: 'Age',
      width: 200,
      render: (d) => <div style={{ lineHeight: '32px' }}>{d.age}</div>,
    },
    {
      title: 'Operation',
      width: 100,
      render: (d) => {
        return (
          <Link type='danger' style={{ lineHeight: '32px' }}>
            <Popover.Confirm
              title='Sure to delete?'
              onCancel={() => console.log('cancel')}
              onOk={() => {
                const newDatas = tableData.values.filter((item) => item.id !== d.id);
                setTableData({ values: newDatas });
                setFormDatas({ values: newDatas });
              }}
            ></Popover.Confirm>
            Delete
          </Link>
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
            };
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
