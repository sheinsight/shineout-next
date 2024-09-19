/**
 * cn - 自定义列表布局
 *    -- 通过设置`header`属性可以自定义列表头部区域内容
 *    -- 通过设置`footer`属性可以自定义列表底部区域内容
 *    -- 通过设置`renderOptionList`可以自定义列表内容，并将列表实例抛出
 *    -- 注意，与`emptyText`属性搭配使用时，`emptyText`渲染优先级高于`renderOptionList`，可将`emptyText`设置为 false 忽略空内容渲染，如需渲染空内容，请在`renderOptionList`中自行处理
 * en - Header
 *    -- Set `header` to customize the content of the header area
 */
import React, { useState } from 'react';
import { Select } from 'shineout';

const defaultData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

export default () => {
  const [data, setData] = useState(defaultData);

  const handleAppend = () => {
    setData(['new color', ...data]);
  };

  const addMore = (
    <div
      style={{
        height: 32,
        backgroundColor: '#197AFA',
        color: '#ffffff',
        padding: '5px 12px',
        boxSizing: 'border-box',
      }}
      onClick={handleAppend}
    >
      + add
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Select
        header={addMore}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        footer={addMore}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        keygen
        onCollapse={(v) => console.log(v)}
        width={300}
        clearable
        data={data}
        placeholder='Select Color'
        renderOptionList={(s) => (
          <div>
            {addMore}
            <div>{s}</div>
            {addMore}
          </div>
        )}
      />
    </div>
  );
};
