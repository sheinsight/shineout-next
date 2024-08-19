/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Badge, Tag } from 'shineout';

export default () => {
  return (
    <div>
      <Badge count={10}>
        <Tag color='info'>消息通知</Tag>
      </Badge>
    </div>
  );
};
