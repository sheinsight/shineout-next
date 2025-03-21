/**
 * cn -
 *    -- 出于性能考虑，默认情况下 disabled 只会在初始化时调用一次
 *    -- 如果 disabled 为函数且内部依赖外部状态，可以将其设置为一个对象来使用配置模式，以确保禁用结果计算的准确性
 *    -- 配置模式包含 `disabled` 函数 和 `isRealtime` 属性
 *    -- 当 `isRealtime` 为 true 时，每次状态更新都会调用 disabled 函数重新计算禁用结果
 *    -- 注意，配置模式下 disabled 函数会在每次状态更新时调用，可能会带来额外的性能开销，建议配合虚拟列表使用
 * en -
 *    -- For performance reasons, the disabled function will only be called once when the component is initialized by default
 *    -- If `disabled` is a function and depends on external state, you can set it to an object to use the configuration mode to ensure the accuracy of the disabled result calculation
 *    -- The configuration mode includes the `disabled` function and the `isRealtime` attribute
 *    -- When `isRealtime` is true, the disabled function will be called to recalculate the disabled result every time the state is updated
 *    -- Note that the disabled function under the configuration mode will be called every time the state is updated, which may bring additional performance overhead, it is recommended to use it with virtual list
 */
import React, { useState } from 'react';
import { Cascader, Switch, Form, TYPE } from 'shineout';

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

  const handleDisabledStatus: CascaderProps['disabled'] = (item) => {
    return checked ? item.value === 'jiangsu' : false;
  };

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <Form labelWidth={60} labelAlign='left'>
      <Form.Item label="开启禁用">
        <Switch value={checked} onChange={setChecked} style={{ marginRight: 12 }} />
      </Form.Item>
      <Form.Item label="选择选项">
        <Cascader
          clearable
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
      </Form.Item>
    </Form>
  );
};
