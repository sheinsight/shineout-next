/**
 * cn - 标题模式
 *    -- 通过设置 `title` 属性可以展示标题模式的提示框
 * en - Title
 *    -- Set the `title` property to display the title mode alert box.
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <Alert type='info' icon title='Heading' closable>
      This is a line of important text for alerting purposes
    </Alert>
  );
};
