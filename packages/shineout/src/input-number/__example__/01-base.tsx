/**
 * cn - 基本用法
 *    -- 清空后失焦保持为空，值为 `null`，不会回填 `0` 或 `min`
 *    -- 设置 `allowNull={false}` 可恢复 `Input.Number` 的行为
 * en - Basic
 *    -- Clearing the input keeps it empty on blur and the value is `null`, `0` or `min` is not refilled
 *    -- Set `allowNull={false}` to restore the behavior of `Input.Number`
 */
import React, { useState } from 'react';
import { InputNumber } from 'shineout';

export default () => {
  const [value, setValue] = useState<string | number | null | undefined>(8);

  return (
    <div style={{ width: 300 }}>
      <InputNumber min={5} max={10} value={value} onChange={setValue} clearable />
      <div style={{ marginTop: 12 }}>value: {JSON.stringify(value)}</div>
    </div>
  );
};
