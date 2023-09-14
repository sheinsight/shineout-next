/**
 * cn - 允许关闭
 *    -- 通过设置 `closable` 属性可以展示关闭按钮。通过 `onClose` 属性可以设置关闭回调函数。
 *    -- 注意 `onClose` 属性未来不再支持 boolean 类型，`hideClose` 属性即将弃用，请使用 `closable`。
 * en - Basic
 *    -- The basic usage of Alert, used to display important prompt information in the page.
 */
import React, { useState } from 'react';
import { Alert, Button } from 'shineout';

export default () => {
  const [reset, setReset] = useState(true);
  const handleReset = () => {
    setReset(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setReset(false);
    }, 300);
  };

  return (
    <div>
      <Button onClick={handleReset} mode='text' type='primary' style={{ marginBottom: 12 }}>
        重置
      </Button>
      {reset && (
        <Alert icon closable type='info' onClose={handleClose}>
          This is informative text.
        </Alert>
      )}
    </div>
  );
};
