/**
 * cn - 动态加载
 *    -- 配置`loader`开启动态加载功能，当点击的节点没有子节点时，会调用`loader`函数
 *    -- 注意，该功能仅支持`mode`为 3 或 4 模式
 * en - Loader
 *    -- Set `loader` property to enable dynamic loading. When the node has no children, the `loader` function will be called
 *    -- Note that this feature only supports mode 3 or 4
 */
import React, { useState } from 'react';
import { produce } from 'immer';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i) => ({ id: i }));
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

export default () => {
  const [_data, setData] = useState(initData);
  const [value, setValue] = useState<string[]>([]);

  const loader = (key: string[]) => {
    const path = key.toString().split(',');
    console.log(23333);
    setTimeout(() => {
      const producer = produce((draft) => {
        let { data } = draft;
        path.forEach((pid, i) => {
          data = draft.find((d: { id: string }) => d.id === pid);
          if (i < path.length - 1) draft = data.children;
        });
        data.children = [...createRange().map((i) => ({ id: `${data.id}-${i}` }))];
      });
      const nextState = producer(_data);
      setData(nextState);
    }, 500);
  };

  const handleChange = (v) => setValue(v);
  const renderItem = (node) => `node ${node.id}`;
  const keyGenerator = (node, parentKey) => `${String(parentKey)},${node.id}`.replace(/^,/, '');

  return (
    <div>
      <Cascader
        mode={3}
        width={300}
        placeholder='Please select city'
        data={_data}
        loader={loader}
        value={value}
        onChange={handleChange}
        keygen={keyGenerator}
        renderItem={renderItem}
      />
    </div>
  );
};
