import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 12 };

const App: React.FC = () => (
  <div style={{ width: 300 }}>
    <Input style={style} type='tel' placeholder='digits undefined' />
    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />
    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />
    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />
    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' />
    <Input style={style} type='number' integerLimit={3} placeholder='integerLimit 3' clearable />
    <Input
      style={style}
      autoFix
      digits={3}
      type='number'
      placeholder='digits 3; autoFix'
      clearable
    />
    <Input
      style={style}
      numType='positive'
      integerLimit={3}
      type='number'
      placeholder='positive;integerLimit 3'
    />
    <Input.Number numType='positive' integerLimit={3} placeholder='positive; integerLimit 3' />
  </div>
);

export default App;
