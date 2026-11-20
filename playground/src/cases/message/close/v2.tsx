import { Button, Message } from 'shineout-v2';
import { DURATION } from '../_shared/scenarios';

// onClose 在消息关闭后触发，里面再弹一条 info；两条都用短 duration，让场景能等到全部消失
export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          Message.warn('Close this message will display another message.', DURATION, {
            onClose: () => Message.info('You can close the message now.', DURATION),
          })
        }
      >
        Close callback
      </Button>
    </span>
  );
}
