/**
 * cn - 基本用法
 *    -- 基础的徽标展示。当 `count` 为0时默认不展示，可以通过配置 `showZero` 修改为展示。
 * en - Basic
 *    -- The basic badge display, the badge is not displayed by default when `count` is 0. You can modify it to display by configuring `showZero`
 */
import React, { useState } from 'react';
import { Badge, Switch } from 'shineout';
import Avatar from './static/avatar';

export default () => {
  const [showZero, setShowZero] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge count={1}>
        <Avatar></Avatar>
      </Badge>
      <Badge count={0} showZero={showZero}>
        <Switch onChange={setShowZero} value={showZero}></Switch>
      </Badge>
    </div>
  );
};
