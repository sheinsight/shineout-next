/**
 * cn - 基本用法
 *    -- Select 通过`data`属性设置数据源，通过`keygen`属性设置key生成器，通过`renderItem`属性设置渲染函数
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from 'shineout';


export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select width={300} clearable data={data} keygen placeholder='Select Color' />
    </div>
  );
};
