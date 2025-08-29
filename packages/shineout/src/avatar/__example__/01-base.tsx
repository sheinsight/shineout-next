/**
 * cn - 基本用法
 *    -- 头像的基础使用
 * en - Basic
 *    -- The basic usage of Avatar
 */
import React from 'react';
import { Avatar } from 'shineout';

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
    <div>
      <Avatar icon={userIcon} />
    </div>
  );
};
