import { Button, Message } from 'shineout-v3';

// 原示例弹出 duration=0 的消息，里面有一个链接，点链接手动关闭。
// 场景只测「弹出」，关闭由场景在 settleUntil 里通过"Close All"完成
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span data-bench='show'>
        <Button
          onClick={async () => {
            const close = await Message.success(
              <div>
                I will always show until &nbsp;
                <a onClick={() => close()}>manually closed</a>
              </div>,
              0,
              { title: 'Manual Close' },
            );
          }}
        >
          Manual Close
        </Button>
      </span>
      <span data-bench='close'>
        <Button onClick={() => Message.close()}>Close All</Button>
      </span>
    </div>
  );
}
