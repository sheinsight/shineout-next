/**
 * cn - 基本用法
 *    -- Select 通过`data`属性设置数据源，通过`keygen`属性设置key生成器，通过`renderItem`属性设置渲染函数
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

const data: number[] = [];

for (let i = 0; i < 20; i++) {
  data.push(i);
}

export default () => {
  return (
    <div>
      <Select width={300} clearable data={data} keygen placeholder='Select Color' />
    </div>
  );
};
