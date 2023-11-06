/**
 * cn - 带边框展示
 *    --
 * en - Show With Border
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
    value: 'Yingdu Building,Zhichun Road,Beijing',
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
        layout='horizontal'
        border
        tableLayout='fixed'
        style={{ marginBottom: '20px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        border
        tableLayout='fixed'
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: '20px' }}
      />
      <Descriptions items={data} title='User Info' layout='vertical' border tableLayout='fixed' />
    </div>
  );
};
