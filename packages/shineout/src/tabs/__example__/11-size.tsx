/**
 * cn - 大小
 *    -- 通过 `size` 属性设置标签页的大小，支持 `small`、`default`、`large` 三种尺寸
 *    -- 大号页签用在页头区域，小号用在弹出框等较狭窄的容器内
 * en - Size
 *    -- Set the size of tabs through the `size` property, supports `small`, `default`, `large`
 *    -- Large tabs are used in page header areas, small tabs are used in narrow containers like popups
 */
import React, { useState } from 'react';
import { Tabs, Radio } from 'shineout';

type SizeType = 'small' | 'default' | 'large';

export default () => {
  const [size, setSize] = useState<SizeType>('default');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Radio.Group
        keygen
        value={size}
        onChange={(v) => setSize(v as SizeType)}
        data={['small', 'default', 'large'] as SizeType[]}
        renderItem={(d: SizeType) => d.charAt(0).toUpperCase() + d.slice(1)}
      />

      <Tabs shape='line' size={size} defaultActive={1}>
        <Tabs.Panel tab='Tab 1'>Content of tab 1</Tabs.Panel>
        <Tabs.Panel tab='Tab 2'>Content of tab 2</Tabs.Panel>
        <Tabs.Panel tab='Tab 3'>Content of tab 3</Tabs.Panel>
      </Tabs>

      <Tabs shape='card' size={size} defaultActive={0}>
        <Tabs.Panel tab='Card Tab 1'>Content of card tab 1</Tabs.Panel>
        <Tabs.Panel tab='Card Tab 2'>Content of card tab 2</Tabs.Panel>
        <Tabs.Panel tab='Card Tab 3'>Content of card tab 3</Tabs.Panel>
      </Tabs>
    </div>
  );
};
