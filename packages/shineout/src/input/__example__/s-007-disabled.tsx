import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 12 };

const App: React.FC = () => (
  <div>
    <Input.Group disabled style={style}>
      <Input placeholder='first name' />
      -
      <Input placeholder='last name' />
    </Input.Group>

    <Input disabled style={style} placeholder='disabled input' />
  </div>
);

export default App;
