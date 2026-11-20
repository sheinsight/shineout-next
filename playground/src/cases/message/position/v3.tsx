import { Button, Message } from 'shineout-v3';
import { DURATION } from '../_shared/scenarios';

// 原示例用 Radio.Group 选 position（Radio 还没迁移），这里固定为 top-right，并带 title
export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          Message.info(<div style={{ width: 240 }}>some message.</div>, DURATION, {
            position: 'top-right',
            title: 'notify title',
          })
        }
      >
        Show message.
      </Button>
    </span>
  );
}
