import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 12 };

const App: React.FC = () => {
  return (
    <div>
      <Input.Group style={style}>
        <b className='min'>min</b>
        <Input.Number placeholder='100' min={100} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='max'>max</b>
        <Input.Number placeholder='200' max={200} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='maxLength'>maxLength</b>
        <Input placeholder='5' maxLength={5} step={3} />
      </Input.Group>
    </div>
  );
};

export default App;
