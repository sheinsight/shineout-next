/**
 * cn - 分隔符
 *    -- 渲染分隔符
 * en - Divider
 *    -- Render divider
 */
import React from 'react';
import { Gap, Divider, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400, alignItems: 'center' }}>
    <Button mode='text' type='primary'>
      tag0
    </Button>
    <Divider mode='vertical' />
    <Button mode='text' type='primary'>
      tag1
    </Button>
    <Divider mode='vertical' />
    <Button mode='text' type='primary'>
      tag2
    </Button>
  </Gap>
);

export default App;
