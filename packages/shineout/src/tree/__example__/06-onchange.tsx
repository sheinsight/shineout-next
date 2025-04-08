/**
 * cn - 可选择树
 *    -- 配置 `onChange` 以及 `value` 属性开启数据选择功能
 *    -- 配置 `mode` 属性返回不同结构的数据：
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得
 * en - Selectable tree
 *    -- Configure the `onChange` and `value` properties to enable data selection
 *    -- Configure the `mode` property to return different structures of data:
 *    -- When the mode is 0, it returns the fully selected node, including the parent node
 *    -- When the mode is 1, it returns the selected and half-selected nodes
 *    -- When the mode is 2, it only returns leaf nodes
 *    -- When the mode is 3, it only returns fully selected parent nodes
 *    -- When the mode is 4, it returns what you see is what you get
 */

import { useState } from 'react';
import { Tree, Radio, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([5, 1, 2]);

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

  const [value, setValue] = useState<TreeProps['value']>([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleChange: TreeProps['onChange'] = (v) => {
    setValue(v);
  };

  const handleModeChange = (v: any) => {
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
        <pre
          style={{
            flex: 1,
            margin: 10,
            background: '#1d1d1d',
            color: '#94d5fc',
            borderRadius: 4,
            padding: 10,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <code style={{ color: '#5D8E4E' }}>
              <span>/</span>
              <span>/</span> DataItem[]
            </code>
          </div>
          {value && value.length > 0 && <code>{JSON.stringify(value, null, 2)}</code>}
          {!value || (value.length === 0 && <code style={{ color: '#757575' }}>no data</code>)}
        </pre>
      </div>
    </div>
  );
};
