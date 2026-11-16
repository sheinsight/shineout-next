import { Button, message } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span data-bench='show'>
        <Button
          onClick={() => {
            const close = message.success({
              content: (
                <span>
                  I will always show until &nbsp;
                  <a onClick={() => close()}>manually closed</a>
                </span>
              ),
              duration: 0,
            });
          }}
        >
          Manual Close
        </Button>
      </span>
      <span data-bench='close'>
        <Button onClick={() => message.destroy()}>Close All</Button>
      </span>
    </div>
  );
}
