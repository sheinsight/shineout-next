/**
 * cn - mode=3 + loader 勾选父节点后加载子节点的勾选状态同步
 *    -- 复现：先勾选 node 0，再点击 node 0 触发 loader 加载子节点；子节点应自动呈现勾选态。
 *    -- 修复前：子节点 Checkbox 显示未勾选，需点别的节点再点回来才会刷新。
 * en - mode=3 + loader: children checked state after async load
 *    -- Repro: check node 0, then click node 0 to trigger loader; loaded children should appear checked.
 *    -- Before fix: children stayed unchecked until switching path forced a re-render.
 */
import React, { useState } from 'react';
import { produce } from 'immer';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value?: string;
  id?: string;
  children?: DataItem[];
}

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i) => ({ id: i }));
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

export default () => {
  const [_data, setData] = useState<DataItem[]>(initData);
  const [value, setValue] = useState<string[]>([]);

  const loader: CascaderProps['loader'] = (key) => {
    const path = key.toString().split(',');
    setTimeout(() => {
      setData(prevState => {
        const producer = produce((draft) => {
          let { data } = draft;
          path.forEach((pid, i) => {
            data = draft.find((d: { id: string }) => d.id === pid);
            if (i < path.length - 1) draft = data.children;
          });
          data.children = [...createRange().map((i) => ({ id: `${data.id}-${i}` }))];
        });
        const nextState = producer(prevState);
        return nextState;
      });
    }, 500);
  };

  const handleChange: CascaderProps['onChange'] = (v) => setValue(v);
  const renderItem: CascaderProps['renderItem'] = (node) => `node ${node.id}`;
  const keyGenerator: CascaderProps['keygen'] = (node, parentKey) =>
    `${String(parentKey)},${node.id}`.replace(/^,/, '');

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
