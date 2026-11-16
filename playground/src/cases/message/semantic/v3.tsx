import { Button, Message } from 'shineout-v3';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          Message.info('Styled message with custom shadow', DURATION, {
            classNames: { item: 'my-message-item', message: 'my-message-content' },
            styles: { item: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }, message: { borderRadius: 8 } },
          })
        }
      >
        Static classNames
      </Button>
    </span>
  );
}
