import { Button, notification } from 'antd';
import { DURATION } from '../_shared/scenarios';

// antd 的 message 没有 position / title；带 position 和 title 的通知在 antd 里是 notification（placement + title）
export default function Demo() {
  return (
    <span data-bench='show'>
      <Button
        onClick={() =>
          notification.info({
            title: 'notify title',
            description: <div style={{ width: 240 }}>some message.</div>,
            placement: 'topRight',
            duration: DURATION,
          })
        }
      >
        Show message.
      </Button>
    </span>
  );
}
