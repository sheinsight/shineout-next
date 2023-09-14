/**
 * cn - 无边框
 *    -- 设置 `bordered` 属性为 false 可以隐藏提示框的边框。
 * en - No border
 *    -- Set the `bordered` property to false to hide the border of the alert box.
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <Alert icon type='info' bordered={false}>
      This is a line of important text for alerting purposes
    </Alert>
  );
};
