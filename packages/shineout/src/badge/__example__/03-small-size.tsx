/**
 * cn - 尺寸
 *    -- 设置 `size` 属性为 `small` 可以显示小尺寸的徽标。支持的尺寸有 `small` 和 `default`。
 * en - Size
 *    -- Set the `size` property to `small` to display a small badge. The supported sizes are `small` and `default`.
 */
import React from 'react';
import { Badge } from 'shineout';
import Avatar from './static/avatar';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Badge count={99} size='small'>
        <Avatar></Avatar>
      </Badge>
      <Badge count={99}>
        <Avatar></Avatar>
      </Badge>
    </div>
  );
};
