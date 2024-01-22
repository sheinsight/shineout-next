/**
 * cn - delay
 *    -- delay=300
 */
import { useState } from 'react';
import { Input } from 'shineout';

export default () => {
  const [v, setV] = useState('');
  return (
    <>
      <span>{v}</span>
      <Input
        width={300}
        value={v}
        placeholder='input something'
        delay={300}
        onChange={(d) => {
          console.log(d);
          setV(d || '');
        }}
      />
    </>
  );
};
