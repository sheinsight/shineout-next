/**
 * cn - 动态加载
 *    -- 通过设置`loader`函数实现动态加载节点
 * en - Loader
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
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
