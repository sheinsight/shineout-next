/**
 * cn - 基本用法
 *    -- 基础 Spin 用法
 * en - Basic
 *    -- Basic Spin usage.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  return (
    <div style={{ width: 20 }}>
      <Spin name='ring' size={16} />
    </div>
  );
};
