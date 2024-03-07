/**
 * cn - 多选
 *    -- 开启 `multiple` 属性或者设置 `mode` 属性可以选择多个值
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得，没有上下级关系
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { Cascader, Radio, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

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

export default () => {
  const [value, setValue] = useState<CascaderProps['value']>([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);

  const handleModeChange = (v: any) => {
    setMode(v.value);
    setValue([]);
  };

  const handleChange: CascaderProps['onChange'] = (v) => {
    setValue(v);
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
          <Cascader
            clearable
            multiple
            singleRemove
            mode={mode}
            width={300}
            placeholder='Please select city'
            data={data}
            keygen='value'
            value={value}
            onChange={handleChange}
            renderItem={(n) => `${n?.value}`}
          />
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
