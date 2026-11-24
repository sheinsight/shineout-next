/**
 * cn - container position
 *    -- 测试自定义容器内横向滚动后，position="auto" 的弹出方向与内容宽度
 * en - Container position
 *    -- Test auto position and content width inside a horizontally scrollable custom container
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const buttonStyle: React.CSSProperties = { display: 'block', margin: '100px auto 100px 80%' };
const targetStyle: React.CSSProperties = {
  width: 500,
  height: 400,
  overflow: 'auto',
  position: 'relative',
};
const blockStyle: React.CSSProperties = { width: 1000, height: 300, backgroundColor: '#f0f0f0' };

const App: React.FC = () => (
  <div id='popup-target-position' style={targetStyle}>
    <div style={blockStyle} />
    <Button style={buttonStyle} mode='outline'>
      Scrollable
      <Popover
        trigger='hover'
        getPopupContainer={() => document.querySelector('#popup-target-position')}
        position='auto'
        priorityDirection='horizontal'
      >
        render in parent element
      </Popover>
    </Button>
    <div style={blockStyle} />
  </div>
);

export default App;
