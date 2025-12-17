/**
 * cn - 内嵌标题
 *    -- 通过配置`innerTitle`可以渲染内嵌标题
 * en - Inner title
 *    -- Set `innerTitle` to render inner title
 */
import React from 'react';
import { Select, Gap } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <Gap style={{ flexDirection: 'column', gap: 24 }}>
      <Select size="small" innerTitle='Select Color' width={300} data={data} keygen multiple clearable />
      <Select innerTitle='Select Color' width={300} data={data} keygen multiple clearable />
      <Select size="large" innerTitle='Select Color' width={300} data={data} keygen multiple clearable />
    </Gap>
  );
};
