import { Button, message } from 'antd';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          message.open({
            type: 'warning',
            content: 'Close this message will display another message.',
            duration: DURATION,
            onClose: () => message.info('You can close the message now.', DURATION),
          })
        }
      >
        Close callback
      </Button>
    </span>
  );
}
