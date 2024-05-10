/**
 * cn - 带边框展示
 *    -- 带边框和背景颜色的列表
 * en - Show With Border
 *    -- List with border and background color
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
        labelStyle={{ textAlign: 'end' }}
        style={{ marginBottom: '20px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='vertical'
        border
        tableLayout='fixed'
        column={4}
      />
    </div>
  );
};
