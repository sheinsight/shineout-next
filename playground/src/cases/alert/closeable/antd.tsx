import { useState } from 'react';
import { Alert, Button } from 'antd';
import { CLOSE_DELAY } from './shared';

export default function Demo() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {!show && (
        <Button type='link' onClick={() => setShow(true)}>
          重置
        </Button>
      )}
      {show && (
        <Alert
          showIcon
          type='info'
          title='This is informative text.'
          closable={{ onClose: () => setTimeout(() => setShow(false), CLOSE_DELAY) }}
        />
      )}
    </div>
  );
}
