/**
 * cn - 受控模式
 *    -- 设置`current`和`onChange`属性，可以作为受控组件使用
 * en - Controlled
 *    -- Set `current` and `onChange` property to use as a controlled component
 */
import { useState } from 'react';
import { Pagination, Input } from 'shineout';

export default () => {
  const [current, setCurrent] = useState(1);

  const handleCurrentChange = (v) => setCurrent(Number(v));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 14 }}>跳转至</span>
        <Input.Number
          min={1}
          max={10}
          value={current}
          onChange={handleCurrentChange}
          style={{ width: 80, marginLeft: 8 }}
        />
      </div>
      <Pagination total={100} span={3} current={current} onChange={setCurrent} />
    </div>
  );
};
