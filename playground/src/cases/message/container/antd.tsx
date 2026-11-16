import { useRef } from 'react';
import { Button, message } from 'antd';
import { DURATION } from '../_shared/scenarios';

// antd 的 container 是全局配置（message.config({ getContainer }）），不能每次调用单独指定。
// 这里在点击时先设置，再弹出；config 会销毁已有的 message 容器、重新创建，所以每次点击都包含这笔开销
export default function Demo() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        ref={container}
        id='container'
        style={{ width: 100, height: 100, background: '#f4f5f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span data-bench='show'>
          <Button
            onClick={() => {
              message.config({ getContainer: () => container.current || document.body });
              message.open({ content: 'Some message.', duration: DURATION });
            }}
          >
            Show
          </Button>
        </span>
      </div>
    </div>
  );
}
