/**
 * cn - 独立使用
 *    -- 不包裹任何元素即是独立使用，可自定样式展现
 * en - No children
 *    -- Independent use, no wrapping elements is independent use, you can customize the style
 */
import React from 'react';
import { Badge } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 42 }}>
      <Badge count={1}></Badge>
      <Badge count={100} overflowCount={99} color='#faad14'></Badge>
    </div>
  );
};
