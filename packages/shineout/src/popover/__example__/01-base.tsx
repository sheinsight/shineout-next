/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
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
