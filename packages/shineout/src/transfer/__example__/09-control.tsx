/**
 * cn - 受控
 *    -- 支持组件受控
 *    -- 可以通过`format`属性指定最终获取的数据类型，默认返回选中的数据项
 * en - Controlled
 *    -- The value of Transfer can be controlled
 *   -- The data type of the final value can be specified by the `format` property. The default is to return the selected data item
 */
import { useState } from 'react';
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [value, setValue] = useState([]);

  const handleChange = (v: { id: string; name: string }, dataItem) => {
    console.log('======================')
    console.log('dataItem: >>', dataItem)
    console.log('======================')
    setValue(v);
  };

  return (
    <div>
      <Transfer
        data={data}
        value={value}
        onChange={handleChange}
        keygen='id'
        listHeight={232}
        renderItem='name'
      ></Transfer>
    </div>
  );
};
