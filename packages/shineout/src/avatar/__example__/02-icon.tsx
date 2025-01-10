/**
 * cn - 类型
 *    -- 支持三种类型：图片、字符、Icon ，其中 Icon 和字符型可以自定义图标颜色及背景色
 * en - Basic
 *    -- The basic usage of Avatar
 */
import React from 'react';
import { Icon01, Icon02 } from './static/icon';
import { Avatar, Badge } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar icon={Icon01}></Avatar>
      <Avatar>J</Avatar>
      <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png'></Avatar>
      <Badge count={Icon02}>
        <Avatar
          style={{ zIndex: 1 }}
          src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/05.png'
        ></Avatar>
      </Badge>
    </div>
  );
};
