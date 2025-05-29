/**
 * cn -
 *    -- Form的表单项使用 name 绑定字段用法
 *    -- Form的`value`需要是一个对象，对象的属性值是数组，数组的每一项是一个对象
 * en -
 *    -- Form item use name to bind field
 *    -- The `value` of Form needs to be an object, the value of the object is an array, and each item of the array is an object
 */

import { useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule, Link, Modal } from 'shineout';

export function ItemWithRequired(props: { children: React.ReactNode }) {
  return (
    <div style={{position: 'relative'}}>
      <span style={{ color: '#EB4242', position: 'absolute', top: 0, left: -2, transform: 'translate(-100%, 0)' }}>*</span>
      {props.children}
    </div>
  )
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

export default () => {
  const [formDatas, setFormDatas] = useState<FormTableValues>({
    values:[
      { id: 1, name: 'Tom1', age: '18' },
      { id: 2, name: 'Tom2', age: '28' },
    ]
  });

  const columns: TableColumnItem[] = [
    { title: 'ID', width: 100, render: (d) => <div style={{ lineHeight: '32px' }}>{d.id}</div> },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 200,
      render: (d, index) => {
        return (
          <ItemWithRequired>
            <Form.Item style={{marginBottom: 0}}>
              <Input
                rules={[rules.required]}
                name={`values[${index}].name`}
              />
            </Form.Item>
          </ItemWithRequired>
        );
      },
    },
    {
      title: 'Age',
      width: 200,
      render: (d, index) => {
        return (
          <Form.Item style={{marginBottom: 0}}>
            <Input
              rules={[rules.required]}
              name={`values[${index}].age`}
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Operation',
      width: 100,
      render: (d, index) => {
        return (
          <Link
            type='danger'
            onClick={() => {
              setFormDatas({
                values: formDatas.values.filter((item, idx) => idx !== index),
              });
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
            setFormDatas({
              values: [
                ...formDatas.values,
                {
                  id: formDatas.values.length + 1,
                  name: `Tom${formDatas.values.length + 1}`,
                  age: `${(formDatas.values.length + 1) * 10 + 8}`,
                },
              ]
            });
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

      <Table data={formDatas.values} columns={columns} keygen='id' />
    </Form>
  );
};
