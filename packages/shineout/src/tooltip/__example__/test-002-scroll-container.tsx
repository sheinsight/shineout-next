/**
 * cn - scroll container
 * en - scroll container
 */
import React from 'react';
import { Tooltip, Button, Popover } from 'shineout';

const App: React.FC = () => {
  return (
    <div
      style={{ height: 300, overflow: 'auto', border: '1px solid #ccc', position: 'relative' }}
      id='test-tooltip-container'
    >
      <div style={{ height: 400 }} />
      <Tooltip tip='hello world' trigger='click' animation={false}>
        <Button type='primary'>click me</Button>
      </Tooltip>

      <Button type='primary' id="test-popover-button">
        popover content
        <Popover
          trigger='click'
          adjust
          // scrollContainer={() => document.getElementById('test-tooltip-container')}
          // getPopupContainer={() => document.getElementById('test-tooltip-container')}
        >
          popover content……
        </Popover>
      </Button>
      <div style={{ height: 400 }} />
    </div>
  );
};
export default App;
