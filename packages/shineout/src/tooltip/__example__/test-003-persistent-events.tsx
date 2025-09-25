/**
 * cn - persistent events
 * en - persistent events
 */
import React from 'react';
import { Tooltip, Button, Popover } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='i will not close when hover' trigger='hover' persistent>
      <Button type='primary'
      onClick={() => {
        console.log('button click');
      }}
      onMouseEnter={() => {
        console.log('button mouse enter');
      }}
      onMouseLeave={() => {
        console.log('button mouse leave');
      }}>hover me</Button>
    </Tooltip>

    <Tooltip tip='i will not close when hover' trigger='click' persistent>
      <Button type='primary'
      onClick={() => {
        console.log('button click2');
      }}
      onMouseEnter={() => {
        console.log('button mouse enter2');
      }}
      onMouseLeave={() => {
        console.log('button mouse leave2');
      }}>click me</Button>
    </Tooltip>
  </div>
);
export default App;