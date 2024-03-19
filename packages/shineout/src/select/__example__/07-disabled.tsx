/**
 * cn - 禁用/禁用选项
 *    -- 通过设置`disabled`属性可以禁用组件。disabled为函数时，支持禁用单个选项
 * en - Disabled
 *    -- Set the `disabled` property to disable the component. When `disabled` is a function, support disabling a single option
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: 624 }}>
      <Select width={300} disabled data={data} keygen placeholder='Select Color' clearable />
      <Select
        width={300}
        disabled={(d) => d === 'orange'}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        compressed
        multiple
        value={['red', 'orange']}
        width={300}
        disabled
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        multiple
        compressed
        defaultValue={['red', 'orange']}
        width={300}
        disabled={(d) => d === 'orange'}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};
