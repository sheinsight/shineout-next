/**
 * cn - 过滤数据（服务端）
 *    -- 设置`onFilter`属性且不返回内容时，可以根据输入的内容自行进行过滤，并根据后端接口返回的数据重新设置data
 * en - Filter data (server)
 *    -- Set the `onFilter` property and do not return the content, you can filter according to the input content, and reset the data according to the data returned by the backend interface
 */
import React from 'react';
import { produce } from 'immer';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  children?: DataItem[];
}

const initData: DataItem[] = ['0', '1', '2', '3', '4'].map((i) => ({ id: i }));

let index = 0;
const App = () => {
  const [data, setData] = React.useState(initData);
  const loader = (key: any) => {
    setTimeout(() => {
      const nextData = produce(data, (d: DataItem[]) => {
        d[parseInt(key, 10)].children = Array(6)
          .fill(0)
          .map(() => ({ id: `-${index++}`, children: [] }));
      });
      setData(nextData);
    }, 500);
  };

  return (
    <TreeSelect
      placeholder='Please select content'
      width={300}
      multiple
      loader={loader}
      keygen='id'
      renderItem={(node) => `node ${node.id}`}
      data={data}
    />
  );
};

export default App;
