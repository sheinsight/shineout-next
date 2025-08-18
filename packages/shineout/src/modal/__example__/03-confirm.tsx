/**
 * cn - 确认框
 *    -- 调用 `confirm` 函数可以快捷的显示确认框，便于用户操作；
 *    -- 同时可以通过 `text` 配置 Modal 按钮文案，`onOk` 与 `onClose` 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）
 * en - Confirm
 *    -- Call the `confirm` function to quickly display a confirmation dialog for user actions;
 *    -- You can configure the Modal button text using `text`, and handle confirmation and cancellation events with `onOk` and `onClose` (the Modal will wait for the Promise to resolve before closing if the event returns a Promise).
 */
import React from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const confirm = () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () =>
        new Promise((resolve) => {
          console.log('ok');
          setTimeout(() => resolve(true), 2000);
        }),
        onClose: () => {
          console.log('closed');
        },
        onCancel() {
          console.log('cancelled');
        },
      text: { ok: 'Yes', cancel: 'No' },
    });
  };

  return (
    <div>
      <Button onClick={confirm} mode='outline'>
        confirm
      </Button>
    </div>
  );
};

export default App;
