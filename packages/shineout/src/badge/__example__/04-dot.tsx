/**
 * cn - 小点模式
 *    -- 开启 `dot` 小点模式，不展示数字
 * en - Dot
 *    -- Open `dot` dot mode, do not display numbers
 */
import React from 'react';
import { Badge } from 'shineout';
import Avatar from './static/avatar';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge dot>
        <Avatar></Avatar>
      </Badge>
    </div>
  );
};
