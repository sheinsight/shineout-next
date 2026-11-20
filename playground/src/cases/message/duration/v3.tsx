import { Button, Message } from 'shineout-v3';
import { DURATION } from '../_shared/scenarios';

// 原示例是 duration=10 和 duration=0（不自动关闭）。0 不会自动消失，会让场景的"等 Message 消失"永远等不到，
// 所以这里的两个按钮都用短 duration；第一个按钮对应「自定义 duration」，第二个保留「手动关闭」的 UI（关闭图标）
export default function Demo() {
  return (
    <div>
      <span data-bench='show'>
        <Button onClick={() => Message.info('This message will close after 1 second.', DURATION)}>Duration 1 s.</Button>
      </span>
    </div>
  );
}
