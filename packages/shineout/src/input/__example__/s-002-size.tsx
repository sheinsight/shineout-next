import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };

const App: React.FC = () => (
  <div>
    <Input size='small' style={style} placeholder='small size' clearable />
    <Input style={style} placeholder='default size' clearable />
    <Input size='large' style={style} placeholder='large size' clearable />
  </div>
);

export default App;
