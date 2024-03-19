/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Absolute
 *    -- If the parent container of the option popup layer is blocked, you can set the absolute property to render the popup option in a separate layer. (Not recommended unless necessary)
 */
import React from 'react';
import { Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
const styleAbsolute: React.CSSProperties = {
  padding: 10,
  height: 100,
  width: '100%',
  overflow: 'hidden',
};

export default () => {
  return (
    <div style={styleAbsolute}>
      <Select width={120} keygen data={data} placeholder='default' clearable />
      <Select
        style={{ marginLeft: 16 }}
        width={300}
        absolute
        multiple
        keygen
        data={data}
        placeholder='Select user'
        clearable
      />
    </div>
  );
};
