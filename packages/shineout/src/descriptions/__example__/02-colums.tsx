/**
 * cn - 单列样式
 *    --
 * en - One Colums
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
      <Descriptions items={data} title='User Info' layout='horizontal' column={1} />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        column={1}
        labelStyle={{ textAlign: 'right' }}
      />
    </div>
  );
};
