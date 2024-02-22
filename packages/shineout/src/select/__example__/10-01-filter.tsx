/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter: SelectProps['onFilter'] = (v) => (d) => d.indexOf(v) >= 0;

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        onFilter={handleFilter}
      />
    </div>
  );
};
