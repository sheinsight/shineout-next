import { useState } from 'react';
import { Alert, Button } from 'shineout-v2';
import { CLOSE_DELAY } from './shared';

export default function Demo() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {!show && (
        <Button text type='primary' onClick={() => setShow(true)}>
          重置
        </Button>
      )}
      {show && (
        <Alert icon type='info' onClose={() => setTimeout(() => setShow(false), CLOSE_DELAY)}>
          This is informative text.
        </Alert>
      )}
    </div>
  );
}
