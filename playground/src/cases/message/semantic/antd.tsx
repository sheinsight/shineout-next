import { Button, message } from 'antd';
import { DURATION } from '../_shared/scenarios';

export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          message.open({
            type: 'info',
            content: 'Styled message with custom shadow',
            duration: DURATION,
            classNames: { root: 'my-message-item', wrapper: 'my-message-content' },
            styles: { root: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }, wrapper: { borderRadius: 8 } },
          })
        }
      >
        Static classNames
      </Button>
    </span>
  );
}
