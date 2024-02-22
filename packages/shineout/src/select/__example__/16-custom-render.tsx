/**
 * cn - 自定义列表布局
 *    -- 通过设置`header`属性可以自定义列表头部区域内容
 *    -- 通过设置`footer`属性可以自定义列表底部区域内容
 *    -- `renderOptionList`可以自定义列表内容，并将列表实例抛出
 * en - Header
 *    -- Set `header` to customize the content of the header area
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const shein = <div style={{ background: 'black', color: 'white' }}>SHEIN</div>;
  
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Select
        header={shein}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
      />
      <Select
        footer={shein}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
      />
      <Select
        keygen
        header={shein}
        footer={shein}
        width={300}
        data={data}
        placeholder='Select Color'
        renderOptionList={(s) => (
          <div>
            {shein}
            <div>{s}</div>
            {shein}
          </div>
        )}
      />
    </div>
  );
};
