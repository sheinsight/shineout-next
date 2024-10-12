/**
 * cn - 表格中使用
 *    --  表单嵌套在表格中使用的场景
 * en - Table usage
 *    -- Form usage in table
 */

import { useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule } from 'shineout';

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
      title: 'Name',
      width: 200,
      render: (d) => {
        return (
          <Form.Item>
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
        );
      },
    },
    {
      title: 'Age',
      width: 200,
      render: (d) => {
        return (
          <Form.Item>
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
          <Button
            type='danger'
            onClick={() => {
              setFormDatas(formDatas.filter((item) => item.id !== d.id));
            }}
          >
            Delete
          </Button>
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

        <Form.Submit onClick={() => alert(JSON.stringify(formDatas, null, 2))}>Submit</Form.Submit>
      </div>

      <Table data={formDatas} columns={columns} keygen='id' />
    </Form>
  );
};
