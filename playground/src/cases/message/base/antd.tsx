import { Button, message } from 'antd';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <span data-bench='show'>
        <Button type='primary' onClick={() => message.info('This is a message of info.', DURATION)}>
          Info
        </Button>
      </span>
      <Button onClick={() => message.open({ content: 'Some message.', duration: DURATION })}>Show</Button>
      <Button onClick={() => message.success('This is a message of success.', DURATION)}>Success</Button>
      <Button onClick={() => message.warning('This is a message of warning.', DURATION)}>Warn</Button>
      <Button danger onClick={() => message.error('This is a message of error.', DURATION)}>Error</Button>
      <Button onClick={() => message.destroy()}>Close All</Button>
    </div>
  );
}
