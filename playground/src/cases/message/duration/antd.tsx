import { Button, message } from 'antd';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <div>
      <span data-bench='show'>
        <Button onClick={() => message.info('This message will close after 1 second.', DURATION)}>Duration 1 s.</Button>
      </span>
    </div>
  );
}
