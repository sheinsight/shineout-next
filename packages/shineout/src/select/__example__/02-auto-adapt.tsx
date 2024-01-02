/**
 * cn - 自动撑开列表
 *    -- 设置`autoAdapt`属性，列表会随内容宽度自动撑开
 * en - autoAdapt
 *    -- Set the `autoAdapt` property, the list will automatically expand with the content width
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = [
    'red',
    'loooooooooooooooooooooooooooooooooooooooooooong',
    'yellow',
    'green',
    'cyan',
    'blue',
    'violet',
    'pink',
  ];
  return (
    <div>
      <Select
        width={300}
        autoAdapt
        data={data}
        keygen
        placeholder='Select Color'
        renderItem={(d) => d}
      />
    </div>
  );
};
