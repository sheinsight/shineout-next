/**
 * cn - 动态增减行
 *    -- 测试动态添加或删除行之后表格是否闪烁
 * en - scrollToIndex
 *    -- The virtual list table provides a scrollToIndex method to scroll to the specified row
 */
import { useState } from 'react';
import { Table } from 'shineout';

const AA = () => {
  const [list, setList] = useState([
    { a: 1, id: 1 },
    { a: 2, id: 2 },
    { a: 3, id: 4 },
  ]);

  const columns = [
    { title: 'col1', render: 'a' },
    {
      title: 'operate',
      render: (_d, i) => (
        <div style={{ height: 100 }}>
          <button
            onClick={() =>
              setList((pre) => {
                const temp = [...pre];
                temp.splice(i, 1);
                return temp;
              })
            }
          >
            remove
          </button>
          <button onClick={() => {
            setList((pre) => {
              const temp = [...pre];
              temp.splice(i, 0, { a: Math.random().toString(32), id: Math.random() * 100000 });
              return temp;
            })
          }}>
            add row
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 1000,
        background: '#ccc',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 100 }}></div>
      <div style={{ padding: 20, background: 'red' }}>
        <Table
          style={{ flex: 1 }}
          data={list}
          columns={columns}
          keygen='id'
          sticky={{ css: true, top: 0 }}
        />
      </div>
    </div>
  );
};

export default AA;
