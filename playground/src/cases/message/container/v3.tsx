import { useRef } from 'react';
import { Button, Message } from 'shineout-v3';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        ref={container}
        id='container'
        style={{ width: 100, height: 100, background: '#f4f5f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span data-bench='show'>
          <Button
            onClick={() => Message.show('Some message.', DURATION, { container: container.current || undefined })}
          >
            Show
          </Button>
        </span>
      </div>
    </div>
  );
}
