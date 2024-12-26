/**
 * cn - open受控
 * en - open control
 *    -- Set `open` to control the open state of the Select
 */
import React, { useState } from 'react';
import { Select } from 'shineout';

const defaultData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

export default () => {
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState(['red'])
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
        width={300}
        data={data}
        keygen
        placeholder='测试单选'
        clearable
        onFilter={text => item => item.indexOf(text) >= 0}
      />

      <Select
        keygen
        open={open}
        onCollapse={setOpen}
        value={value}
        onChange={(v) => setValue(v)}
        multiple
        onFilter={text => item => item.indexOf(text) >= 0}
        width={300}
        clearable
        data={data}
        placeholder='Select Color'
        renderOptionList={(s) => (
          <div>
            {addMore}
            <input type='text' placeholder='input' />
            <div>{s}</div>
            {addMore}
          </div>
        )}
      />
    </div>
  );
};
