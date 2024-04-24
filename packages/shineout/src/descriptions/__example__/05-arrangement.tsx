/**
 * cn - 不同排列模式
 *    -- 可以通过tableLayout='fixed'设置等宽，通过layout设置不同的排列方式，设置border是否显示边框
 * en - Arrangement
 *    -- You can set the same width by tableLayout='fixed', and set different arrangement by layout, set border to show border
 */
import React from 'react';
import { Descriptions, Radio } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

type layoutType = 'horizontal' | 'vertical' | 'inlineHorizontal' | 'inlineVertical';
const layouts: layoutType[] = ['horizontal', 'vertical', 'inlineHorizontal', 'inlineVertical'];

type tableLayoutType = 'fixed' | 'auto';
const tableLayouts: tableLayoutType[] = ['auto', 'fixed'];

interface borderType {
  label: string;
  value: boolean;
}
const borders: borderType[] = [
  { label: 'no border', value: false },
  { label: 'border', value: true },
];

export default () => {
  const [layout, setLayout] = React.useState<layoutType>('horizontal');
  const [tableLayout, setTableLayout] = React.useState<tableLayoutType>('auto');
  const [border, setBorder] = React.useState<boolean>(false);
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Radio.Group
        data={layouts}
        value={layout}
        onChange={setLayout}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Radio.Group
        data={tableLayouts}
        value={tableLayout}
        onChange={setTableLayout}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Radio.Group
        data={borders}
        format={'value'}
        renderItem={'label'}
        value={border}
        onChange={setBorder}
        keygen={'label'}
        style={{ marginBottom: 24 }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={<span style={{ paddingInlineStart: '4px' }}>:</span>}
        layout={layout}
        tableLayout={tableLayout}
        border={border}
        labelStyle={{
          marginBottom: layout === 'inlineVertical' ? '2px' : '',
          paddingBottom: layout === 'vertical' ? '2px' : '',
        }}
      />
    </div>
  );
};
