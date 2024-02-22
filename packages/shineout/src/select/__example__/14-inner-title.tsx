/**
 * cn - 内嵌标题
 *    -- 通过配置`innerTitle`可以渲染内嵌标题
 * en - Inner title
 *    -- Set `innerTitle` to render inner title
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        innerTitle='Select Color'
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};
