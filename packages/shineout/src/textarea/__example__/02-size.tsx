/**
 * cn - 尺寸
 *    -- 提供了三种尺寸 small default large
 * en - Size
 *    -- There are three sizes: small, default, and large.
 */
import React from 'react';
import { Textarea } from 'shineout';

const style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };

const App: React.FC = () => (
  <div>
    <Textarea size='small' rows={3} style={style} placeholder='small size' />
    <Textarea style={style} rows={3} placeholder='default size' />
    <Textarea size='large' rows={3} style={style} placeholder='large size' />
  </div>
);

export default App;
