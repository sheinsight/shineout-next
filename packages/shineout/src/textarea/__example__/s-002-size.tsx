import React from 'react';
import { Textarea } from 'shineout';

const style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };

const App: React.FC = () => (
  <div>
    <Textarea size='small' style={style} placeholder='small size' />
    <Textarea style={style} placeholder='default size' />
    <Textarea size='large' style={style} placeholder='large size' />
  </div>
);

export default App;
