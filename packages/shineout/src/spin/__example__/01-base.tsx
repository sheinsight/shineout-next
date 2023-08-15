/**
 * cn - 基本用法
 *    -- 通过配置 name ，可以设置不同的动画效果, 通过配置 size 可以设置动画大小
 * en - Basic
 *    -- Set different animation effects by configuring name, and set animation size by configuring size
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
