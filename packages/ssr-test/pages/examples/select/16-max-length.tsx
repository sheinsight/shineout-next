/**
 * cn - 筛选限制字符长度
 *    -- 设置`loading`为true时会展示一个默认的Spin组件，可以传入一个自定义的Spin代替
 * en - Loading
 *    -- Set `loading` to true will show a default Spin component, you can pass a custom Spin to replace it
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        loading
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};
