/**
 * cn - 禁用/禁用选项
 *    -- 通过设置`disabled`属性可以禁用组件。`disabled` 为函数时，支持禁用单个选项
 *    -- 出于性能考虑，默认情况下 disabled 只会在初始化时调用一次
 *    -- 如果 disabled 为函数且内部依赖外部状态，可以将其设置为一个对象来使用配置模式，以确保禁用结果计算的准确性
 *    -- 配置模式包含 `disabled` 函数 和 `isRealtime` 属性
 *    -- 当 `isRealtime` 为 true 时，每次状态更新都会调用 disabled 函数重新计算禁用结果
 *    -- 注意，配置模式下 disabled 函数会在每次状态更新时调用，可能会带来额外的性能开销，建议配合虚拟列表使用
 * en - Disabled
 *    -- Set the `disabled` property to disable the component. When `disabled` is a function, support disabling a single option
 */
import React, { useState } from 'react';
import { Cascader, Switch, TYPE } from 'shineout';

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
  const [checked, setChecked] = useState(false);

  const handleDisabled: CascaderProps['disabled'] = (item) => {
    return item.value === 'jiangsu';
  };

  const handleDisabledStatus: CascaderProps['disabled'] = (item) => {
    return checked ? item.value === 'jiangsu' : false;
  };

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: 632, marginBottom: 104 }}>
      <Cascader
        width={300}
        disabled
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        clearable
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        width={300}
        disabled
        mode={0}
        onChange={(v) => console.log(v)}
        defaultValue={['jiangsu', 'nanjing']}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        clearable
        mode={0}
        onChange={(v) => console.log(v)}
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <div>
        <Switch value={checked} onChange={setChecked} style={{ marginRight: 12 }} />
        <Cascader
          clearable
          open
          width={246}
          height={100}
          adjust={false}
          onChange={(v) => console.log(v)}
          disabled={{
            disabled: handleDisabledStatus,
            isRealtime: true,
          }}
          placeholder='Please select city'
          data={data}
          keygen='value'
          renderItem={renderItem}
        />
      </div>
    </div>
  );
};
