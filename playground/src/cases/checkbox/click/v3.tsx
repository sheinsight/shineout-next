import { useState } from 'react';
import { Checkbox } from 'shineout-v3';

export default function Demo() {
  const [total, setTotal] = useState(0);
  return (
    <div>
      <Checkbox onClick={() => setTotal(total + 1)}>{`Click Me ${total} Times!`}</Checkbox>
    </div>
  );
}
