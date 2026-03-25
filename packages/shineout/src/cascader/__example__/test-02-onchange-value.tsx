/**
 * cn - 修改value引用
 *    -- 直接修改value引用，测试是否会导致组件异常
 * en - Change value reference
 *    -- Directly modify the value reference to test if it will cause component exceptions
 */
import { useState } from 'react';
import { Button, TreeSelect, Form, Input, Table, TYPE, Rule, Link, Modal, Message, Popover } from 'shineout';

const treeData = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export function ItemWithRequired(props: { children: React.ReactNode; top?: number, disabled?: boolean }) {
  if (props.disabled) {
    return props.children;
  }
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

const not_handle_id = '1-1-1'
const defaultData = [
  { id: 1, name: [not_handle_id], age: '18' },
  { id: 2, name: [not_handle_id], age: '28' },
];
export default () => {
  const [nextId, setNextId] = useState(3);
  const [edits, setEdits] = useState<boolean[]>(new Array(defaultData.length).fill(true));
  const [formDatas, setFormDatas] = useState<FormTableValues>({
    values: defaultData,
  });
  const [tableData, setTableData] = useState<FormTableValues>({
    values: defaultData,
  });

  const changeTableData = (options: {key: string, value: any, index: number}) => {
    const { key, value, index } = options;
    const newDatas = tableData.values.map((item, idx) => (idx === index ? { ...item, [key]: value } : item));
    setTableData({ values: newDatas });
  }

  const columns: TableColumnItem[] = [
    { title: 'ID', width: 100, render: (d, index) => <div key={edits[index]?.toString()} style={{ lineHeight: edits[index] ? '32px' : 'auto' }}>{d.id}</div> },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 200,
      render: (d, index) => {
        return edits[index] ? (
          <Form.Item style={{ marginBottom: 0 }}>
            {/* <Input rules={[rules.required]} name={`values[${index}].name`} /> */}
            <TreeSelect
              keygen='id'
              absolute
              noCache
              mode={2} multiple clearable compressed name={`values[${index}].name`} data={treeData} renderItem='title'
              onFilter={text => d => d.title.includes(text)}
              onChange={(v: any) => {
                console.log('======================')
                console.log('TreeSelect v: >>', v)
                console.log('======================')
                if(v.includes(not_handle_id) && v.length > 1) {
                  v.splice(v.indexOf(not_handle_id), 1)
                }

                changeTableData({ key: 'name', value: v, index });
              }}
            />
          </Form.Item>
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
          <ItemWithRequired disabled={Number(d.age) <= 18} top={5}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Input rules={[rules.required]} name={`values[${index}].age`} />
            </Form.Item>
          </ItemWithRequired>
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
                setEdits(prev => {
                  const newEdits = new Array(prev.length).fill(false);
                  return newEdits;
                });
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
            <Link
              type='primary'
              style={{ lineHeight: '32px' }}
              onClick={() => {
                setEdits(prev => {
                  const newEdits = new Array(prev.length).fill(false);
                  return newEdits;
                });
              }}
            >
              Cancel
            </Link>
          </>
        ) : (
          <>
          <Link
            type='primary'
            onClick={() => {
              setEdits(prev => {
                const newEdits = new Array(prev.length).fill(false);
                newEdits[index] = !prev[index];
                return newEdits;
              });
              setFormDatas({
                values: formDatas.values.map((item, idx) => (idx === index ? { ...d } : item)),
              });
            }}
            style={{ marginRight: 8 }}
            disabled={edits.some(item => item)}
          >
            Edit
          </Link>
          <Link
            type='danger'
            disabled={edits.some(item => item)}
          >
            <Popover.Confirm
              title='Sure to delete?'
              disabled={edits.some(item => item)}
              onCancel={() => console.log('cancel')}
              onOk={() => {
                const newDatas = tableData.values.filter((_, idx) => idx !== index);
                setTableData({ values: newDatas });
                setFormDatas({ values: newDatas });
                setEdits(prev => prev.filter((_, idx) => idx !== index));
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
      <h1>修复 onChange 中删除原始引用值后内部勾选情况未同步更新的问题</h1>
      <div style={{ marginBottom: 12 }}>
        <Button
          type='primary'
          onClick={() => {
            const newDatas = {
              values: [
                ...tableData.values,
                {
                  id: nextId,
                  name: `Tom${nextId}`,
                  age: `${nextId * 10 + 8}`,
                },
              ],
            }
            setTableData(newDatas);
            setFormDatas(newDatas);
            setEdits(prev => [...prev, false]);
            setNextId(prev => prev + 1);
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
