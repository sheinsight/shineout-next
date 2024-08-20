/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Badge } from 'shineout';

export default () => {
  return (
    <div>
      <Badge count={10}>
        <div style={{ height: 32, width: 32, borderRadius: 4, background: '#ebebeb' }}></div>
      </Badge>
    </div>
  );
};
