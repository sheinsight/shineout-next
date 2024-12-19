/**
 * cn - 大数据1
 *    -- test big data 1
 * en - big data 1
 *    -- test big data 1
 */
import React, { useState } from 'react';
import { TreeSelect, Table, Form, TYPE } from 'shineout';
import { user } from '@sheinx/mock';
import bigData1 from './big-data-1'


interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(100);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 200 },
  {
    title: 'CName',
    // fixed: 'left',
    render: (d, index) => (
      <TreeSelect
        name={`cname[${index}].uid`}
        size="small"
        width={300}
        clearable
        keygen="categoryId"
        renderItem="categoryName"
        data={bigData1}
        placeholder="Please select content"
        onFilter={text => item => item.categoryName.indexOf(text) > -1}
      />
    ),
    width: 400,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
];

const App: React.FC = () => {
  const [formValue, setFormValue] = useState({cname: data.map(() => ({uid: '78'}))})

  const handleFormChange = (v) => {
    console.log('======================')
    console.log('form submit value: >>', v)
    console.log('======================')
  };


  return (
    <div>
      <Form style={{ marginBottom: 24 }} value={formValue} onChange={setFormValue} onSubmit={handleFormChange}>
        <Form.Submit>Submit</Form.Submit>
        <TreeSelect
          size="large"
          width={300}
          clearable
          keygen="id"
          renderItem="title"
          data={[
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
          ]}
          placeholder="Please select content"
          onFilter={text => item => item.title.indexOf(text) > -1}
        />
        <Table
          keygen='id'
          bordered
          data={data}
          // virtual
          // rowsInView={10}
          width={2500}
          columns={columns}
          style={{ height: 500 }}
        />
      </Form>
    </div>
  );
};

export default App;
