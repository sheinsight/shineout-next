/**
 * cn - 不同排列模式
 *    --
 * en - Arrangement
 *    --
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
        title='User Info'
        colon={` :`}
        labelStyle={{ textAlign: 'right' }}
        layout='horizontal'
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        colon={` :`}
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={` :`}
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={` :`}
        layout='inlineVertical'
        tableLayout='fixed'
        style={{ marginBottom: '24px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={` :`}
        border
        style={{ marginBottom: '24px' }}
      />
      <Descriptions items={data} title='User Info' colon={` :`} layout='inlineVertical' border />
    </div>
  );
};
