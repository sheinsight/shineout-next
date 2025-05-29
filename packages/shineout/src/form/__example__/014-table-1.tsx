/**
 * cn - 表格中使用
 *    --  表单嵌套在表格中使用的场景
 * en - Table usage
 *    -- Form usage in table
 */

import { useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule, Link, Modal } from 'shineout';
import { ItemWithRequired} from './014-table-2';

interface TableRowData {
  id?: number;
  name?: string;
  age?: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const rules = Rule();

export default () => {
  const [formDatas, setFormDatas] = useState<TableRowData[]>([
    { id: 1, name: 'Tom1', age: '18' },
    { id: 2, name: 'Tom2', age: '28' },
  ]);

  const columns: TableColumnItem[] = [
    { title: 'ID', width: 100, render: (d) => <div style={{ lineHeight: '32px' }}>{d.id}</div> },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 200,
      render: (d) => {
        return (
          <ItemWithRequired>
            <Form.Item style={{marginBottom: 0}}>
              <Input
                rules={[rules.required]}
                value={d.name}
                onChange={(v) => {
                  setFormDatas(
                    formDatas.map((item) => (item.id === d.id ? { ...item, name: v } : item)),
                  );
                }}
              />
            </Form.Item>
          </ItemWithRequired>
        );
      },
    },
    {
      title: 'Age',
      width: 200,
      render: (d) => {
        return (
          <Form.Item style={{marginBottom: 0}}>
            <Input
              rules={[rules.required]}
              value={d.age}
              onChange={(v) => {
                setFormDatas(
                  formDatas.map((item) => (item.id === d.id ? { ...item, age: v } : item)),
                );
              }}
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Operation',
      width: 100,
      render: (d) => {
        return (
          <Link
            type='danger'
            onClick={() => {
              setFormDatas(formDatas.filter((item) => item.id !== d.id));
            }}
            style={{ lineHeight: '32px' }}
          >
            Delete
          </Link>
        );
      },
    },
  ];

  return (
    <Form value={formDatas} onChange={setFormDatas} onSubmit={() => console.log('submit:>>', JSON.stringify(formDatas, null, 2))}>
      <div style={{ marginBottom: 12 }}>
        <Button
          type='primary'
          onClick={() => {
            setFormDatas([
              ...formDatas,
              {
                id: formDatas.length + 1,
                name: `Tom${formDatas.length + 1}`,
                age: `${(formDatas.length + 1) * 10 + 8}`,
              },
            ]);
          }}
        >
          Add
        </Button>

        <Form.Submit onClick={() => {
          Modal.info({
            title: 'Form Data in Table',
            content: <pre>{JSON.stringify(formDatas, null, 2)}</pre>,
          })
        }}>Submit</Form.Submit>
      </div>

      <Table data={formDatas} columns={columns} keygen='id' />
    </Form>
  );
};
