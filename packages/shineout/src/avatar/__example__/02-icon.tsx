/**
 * cn - 类型
 *    -- 支持三种类型：图片、字符、Icon ，其中 Icon 和字符型可以自定义图标颜色及背景色
 * en - Basic
 *    -- The basic usage of Avatar
 */
import React from 'react';
import { Avatar, Badge } from 'shineout';

const userIcon = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M7.99992 8.66667C10.2091 8.66667 11.9999 6.87581 11.9999 4.66667C11.9999 2.45753 10.2091 0.666672 7.99992 0.666672C5.79078 0.666672 3.99992 2.45753 3.99992 4.66667C3.99992 6.87581 5.79078 8.66667 7.99992 8.66667Z'
      fill='#B3B7C1'
    />
    <path
      d='M5.44625 10C3.1747 10 1.33325 11.8415 1.33325 14.113C1.33325 14.4188 1.58114 14.6667 1.88693 14.6667H14.1129C14.4187 14.6667 14.6666 14.4188 14.6666 14.113C14.6666 11.8415 12.8251 10 10.5536 10H5.44625Z'
      fill='#B3B7C1'
    />
  </svg>
);

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar icon={userIcon}></Avatar>
      <Avatar>J</Avatar>
      <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png'></Avatar>
      <Badge count={<div style={{ fontSize: 16, transform: 'rotate(45deg)' }}>🌱</div>}>
        <Avatar style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', color: '#fff' }}>
          🍊
        </Avatar>
      </Badge>
    </div>
  );
};
