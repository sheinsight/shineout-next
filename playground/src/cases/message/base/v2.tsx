import { Button, Message } from 'shineout-v2';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <span data-bench='show'>
        <Button type='primary' onClick={() => Message.info('This is a message of info.', DURATION)}>
          Info
        </Button>
      </span>
      <Button onClick={() => Message.show('Some message.', DURATION)}>Show</Button>
      <Button type='success' onClick={() => Message.success('This is a message of success.', DURATION)}>
        Success
      </Button>
      <Button type='warning' onClick={() => Message.warn('This is a message of warning.', DURATION)}>
        Warn
      </Button>
      <Button type='danger' onClick={() => Message.error('This is a message of error.', DURATION)}>
        Error
      </Button>
      <Button onClick={() => Message.close()}>Close All</Button>
    </div>
  );
}
