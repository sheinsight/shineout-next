/**
 * cn - 基本用法
 *    -- 基本的用法，支持鼠标悬浮即显提示文字
 * en - Basic
 *    -- Basic usage, support mouse hover to show prompt text
 */
import React from 'react';
import { Button, Popover } from 'shineout';

export default () => {
  return (
    <Button>
      Hover
      <Popover>some Text</Popover>
    </Button>
  );
};
