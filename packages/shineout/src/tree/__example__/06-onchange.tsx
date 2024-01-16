/**
 * cn - 可选择树
 *    -- 配置 `onChange` 以及 `value` 属性开启数据选择功能
 *    -- 配置 `mode` 属性返回不同结构的数据：
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得
 * en - line
 *    -- Set line to false to hide the connection line.
 */

import { useState } from 'react';
import { Tree, Radio } from 'shineout';
import { createNestedArray } from './utils';

const data = createNestedArray([5, 1, 2]);

export default () => {
  const radio = [
    {
      mode: 'full',
      value: 0,
    },
    {
      mode: 'half',
      value: 1,
    },
    {
      mode: 'child only',
      value: 2,
    },
    {
      mode: 'shallow',
      value: 3,
    },
    {
      mode: 'freedom',
      value: 4,
    },
  ];

  const [value, setValue] = useState([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);

  const renderItem = (node: any) => {
    return <span>{`node ${node.id}`}</span>;
  };

  const handleChange = (v) => {
    setValue(v);
  };

  const handleModeChange = (v) => {
    setMode(v.value);
    setValue([]);
  };

  return (
    <div>
      <Radio.Group
        size='small'
        keygen='value'
        prediction={(item, v) => item === v.value}
        value={mode}
        onChange={handleModeChange}
        renderItem={(item) => `模式 ${item.value}`}
        data={radio}
        style={{ marginBottom: 24 }}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Tree
            key={mode}
            line={false}
            value={value}
            data={data}
            mode={mode}
            keygen='id'
            renderItem={renderItem}
            onChange={handleChange}
          ></Tree>
        </div>

        <pre style={{ flex: 1, margin: 10 }}>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
};
