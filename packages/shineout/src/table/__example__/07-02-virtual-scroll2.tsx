/**
 * cn -
 *    -- 虚拟列表提供了`getRenderIndexByData`方法获取数据实际的index，然后再调用`scrollToIndex`方法滚动到指定行
 * en - scrollToIndex
 *    -- The virtual list table provides a getRenderIndexByData method to get the actual index of the data, and then call the `scrollToIndex` method to scroll to the specified row
 */
import React, { useState, useEffect } from 'react';
import { Input, Table, Form, TYPE, Button } from 'shineout';

interface TableRowData {
  id: string;
  office: string;
  country: string;
  position: string;
  children?: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;


let defaultTreeExpandKeys:string[] = []
function generateMockTreeData(depth: number, count: number, parentId?: string): TableRowData[] {
  const data: TableRowData[] = [];
  for (let i = 0; i < count; i++) {
    const currentId = parentId ? `${parentId}__${depth}_${i}` : `${depth}_${i}`
    const children = depth > 1 ? generateMockTreeData(depth - 1, count, currentId) : undefined;
    if(children?.length) {
      defaultTreeExpandKeys.push(currentId)
    }
    data.push({
      id: currentId,
      position: `position_${i}`,
      country: `country_${i}`,
      office: `office_${i}`,
      children,
    });
  }
  return data;
}

const mockData = generateMockTreeData(4, 20);

const columns: TableColumnItem[] = [
  {
    title: 'ID',
    render: (d) => (
      <span id={`name_${d.id}`}>
        {d.id}
      </span>
    ),
    width: 300,
    treeIndent: 22,
    treeColumnsName: 'children',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [tableRef, setTableRef] = useState<any>();

  const [state, setState] = useState({
    id: '4_0__3_0__2_5__1_0',
  });

  const handleScroll = () => {
    if (tableRef){
      const index = tableRef.getRenderIndexByData({id: state.id});
      // 或者这样使用也可以：
      // const index = tableRef.getRenderIndexByData(state.id)
      if(index === -1) return;
      tableRef.scrollToIndex(index, () => {
        const el: HTMLElement = document.querySelector(`#name_${state.id}`)!;
        if (el) {
          el.style.color = 'red';
        }
      });
    }
  };

  const handleIndexChange = ({ id }: { id: string }) => {
    setState({ id });
  };

  useEffect(() => {
    setTimeout(handleScroll);
  }, [state]);

  return (
    <div>
      <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
        <Input placeholder='输入ID' width={200} name='id' />
        <Button type='primary' htmlType='submit'>
          Scroll
        </Button>
      </Form>

      <Table
        keygen='id'
        bordered
        data={mockData}
        virtual
        width={1400}
        rowsInView={10}
        columns={columns}
        style={{ height: 500 }}
        tableRef={(t) => setTableRef(t)}
        defaultTreeExpandKeys={defaultTreeExpandKeys}
      />
    </div>
  );
};

export default App;
