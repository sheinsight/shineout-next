/**
 * cn - scroll
 *    -- 123213
 * en - scroll
 *    -- 123213
 */
import React from 'react';
import { Scroll } from '@sheinx/base';
import {} from '@sheinx/shineout-style';

export default () => {
  return (
    <Scroll
      style={{ width: 200, height: 200, background: '#ccc' }}
      scrollWidth={1000}
      scrollHeight={1000}
      onScroll={console.log}
    >
      <div>哈哈哈哈</div>
    </Scroll>
  );
};
