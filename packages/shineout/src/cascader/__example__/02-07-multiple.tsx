/**
 * cn - 按选择顺序排列
 *    -- 设置 `sortBySelect` 属性后，多选模式下的 value 数组将按照用户勾选的先后顺序排列，而非数据在树中的位置顺序
 * en - Sort by selection order
 *    -- When set `sortBySelect`, the value array in multi-select mode will be sorted by the order of user selection instead of tree structure order
 */
import { useState } from 'react';
import { Cascader, TYPE } from 'shineout';

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

export default () => {
  const [value, setValue] = useState<CascaderProps['value']>([]);

  const handleChange: CascaderProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Cascader
          clearable
          multiple
          sortBySelect
          singleRemove
          mode={2}
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
            <span>/</span> value (sorted by selection order)
          </code>
        </div>
        {value && value.length > 0 && <code>{JSON.stringify(value, null, 2)}</code>}
        {!value || (value.length === 0 && <code style={{ color: '#757575' }}>no data</code>)}
      </pre>
    </div>
  );
};
