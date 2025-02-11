/**
 * cn - 封顶数字
 *    -- 设置`overflowCount`属性，当数字大于该值时显示 $\{overflowCount\}+
 * en - Overflow count
 *    -- Set the `overflowCount` property, when the number is greater than this value, display $\{overflowCount\}+
 */
import React from 'react';
import { Badge } from 'shineout';
import Avatar from './static/avatar';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge count={99}>
        <Avatar></Avatar>
      </Badge>
      <Badge count={100} overflowCount={9}>
        <Avatar></Avatar>
      </Badge>
      <Badge count={100} overflowCount={99}>
        <Avatar></Avatar>
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <Avatar></Avatar>
      </Badge>
    </div>
  );
};
