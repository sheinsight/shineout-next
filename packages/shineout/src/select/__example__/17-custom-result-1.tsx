/**
 * cn - 自定义选中结果
 *    -- 通过`renderResult`可以自定义选中结果的渲染
 * en - renderResult
 *    -- Set `renderResult` to custom render the result
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const renderResult = (d: string) => {
    return `i love ${d}`;
  };
  return (
    <div>
      <Select
        width={300}
        renderResult={renderResult}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};
