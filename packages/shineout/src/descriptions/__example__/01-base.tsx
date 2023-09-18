/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
    span: 6,
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

export default () => {
  return (
    <div>
      <Descriptions item={data} title='demo' extra='hello' />
    </div>
  );
};
