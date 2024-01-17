/**
 * cn - 不同排列模式
 *    -- 可以通过tableLayout='fixed'设置等宽，通过layout设置不同的排列方式，设置border是否显示边框
 * en - Arrangement
 *    -- You can set the same width by tableLayout='fixed', and set different arrangement by layout, set border to show border
 */
import React from 'react';
import { Descriptions } from 'shineout';

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

export default () => {
  return (
    <div>
      <Descriptions
        items={data}
        title='fixed + horizontal'
        colon={` :`}
        layout='horizontal'
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='fixed + vertical'
        layout='vertical'
        colon={` :`}
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='fixed + inlineHorizontal'
        colon={` :`}
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='fixed + inlineVertical'
        colon={` :`}
        layout='inlineVertical'
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='Border + inlineHorizontal'
        colon={` :`}
        border
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='Border + inlineVertical'
        colon={` :`}
        layout='inlineVertical'
        border
      />
    </div>
  );
};
