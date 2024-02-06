/**
 * cn - 主题色
 *    -- 通过 `type` 设置主题色
 * en - Type
 *    -- Set the type property to change the theme color.
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Tooltip tip='This is tooltip content' trigger='click'>
      <Button style={{ marginRight: 16 }} type='secondary'>
        default
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='light'>
      <Button style={{ marginRight: 16 }} type='default' mode='outline'>
        light
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='primary'>
      <Button style={{ marginRight: 16 }} type='primary'>
        primary
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='success'>
      <Button style={{ marginRight: 16 }} type='success'>
        success
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='warning'>
      <Button style={{ marginRight: 16 }} type='warning'>
        warning
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='danger'>
      <Button style={{ marginRight: 16 }} type='danger'>
        danger
      </Button>
    </Tooltip>
  </div>
);
export default App;
