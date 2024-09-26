/**
 * cn - 带状态的小点
 *    -- 配置`status`更改徽标的状态
 * en - Basic
 *    -- The basic badge display, the badge is not displayed by default when `count` is 0. You can modify it to display by configuring `showZero`
 */
import React from 'react';
import { Badge } from 'shineout';

export default () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
        <Badge dot status='default'></Badge>
        <Badge dot status='processing'></Badge>
        <Badge dot status='error'></Badge>
        <Badge dot status='warning'></Badge>
        <Badge dot status='success'></Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Badge dot status='default' text='Default'></Badge>
        <Badge dot status='processing' text='Processing'></Badge>
        <Badge dot status='error' text='Error'></Badge>
        <Badge dot status='warning' text='Warning'></Badge>
        <Badge dot status='success' text='Success'></Badge>
      </div>
    </div>
  );
};
