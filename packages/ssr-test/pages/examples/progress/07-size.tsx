/**
 * cn - 大小
 *    -- 通过 size 或 style 来控制大小
 *    -- 通过 strokeWidth 属性来控制线框宽度
 *    -- 通过 iconSize 属性来控制图标大小
 * en - Size
 *    -- Set size or style to change the size of progress
 *   -- Set strokeWidth to change the width of line
 *  -- Set iconSize to change the size of icon
 */
import React, { useState } from 'react';
import { Progress, Radio } from 'shineout';

const sizeList = ['small', 'default', 'large'];
const App: React.FC = () => {
  const [size, setSize] = useState('default');

  return (
    <div>
      <Radio.Group
        keygen
        data={sizeList}
        value={size}
        onChange={setSize}
        style={{ marginBottom: 24 }}
      />
      {size === 'small' && (
        <>
          <Progress style={{ width: 400 }} strokeWidth={3} value={75}>
            <span style={{ fontSize: 12 }}>75%</span>
          </Progress>
          <Progress
            shape='line-inner'
            style={{ width: 400, marginTop: 24 }}
            strokeWidth={16}
            value={40}
          >
            <span style={{ fontSize: 12 }}>40%</span>
          </Progress>
          <Progress size={48} strokeWidth={4} shape='circle' value={60} style={{ marginTop: 24 }}>
            <span style={{ fontSize: 12 }}>60%</span>
          </Progress>
        </>
      )}
      {size === 'large' && (
        <>
          <Progress style={{ width: 400 }} strokeWidth={8} value={75}>
            <span style={{ fontSize: 16 }}>75%</span>
          </Progress>
          <Progress
            shape='line-inner'
            style={{ width: 400, marginTop: 24 }}
            strokeWidth={24}
            value={40}
          >
            <span>40%</span>
          </Progress>
          <Progress size={80} strokeWidth={4} shape='circle' value={60} style={{ marginTop: 24 }}>
            <span style={{ fontSize: 16 }}>60%</span>
          </Progress>
        </>
      )}
      {size === 'default' && (
        <>
          <Progress style={{ width: 400 }} value={75}>
            <span>75%</span>
          </Progress>
          <Progress shape='line-inner' style={{ width: 400, marginTop: 24 }} value={40}>
            <span>40%</span>
          </Progress>
          <Progress shape='circle' value={60} style={{ marginTop: 24 }}>
            <span>60%</span>
          </Progress>
        </>
      )}
    </div>
  );
};

export default App;
