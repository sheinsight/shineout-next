/**
 * cn - 头像组
 *    -- 通过配置 `max` 属性设置最大展示个数，超过则隐藏显示，如果需要个性化展示超出内容，可以使用 `renderMax` 属性
 * en - Group
 *    -- Set the maximum number of avatars displayed by configuring the `max` property. If it exceeds, it will be hidden. If you need to display the content beyond the personalized display, you can use the `renderMax` property
 */
import React from 'react';
import { Avatar, Popover } from 'shineout';

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

const url =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/001.png';

export default () => {
  const renderMax = (dom: React.ReactNode[], num: number) => {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #fff',
          boxSizing: 'border-box',
        }}
      >
        {num}?<Popover style={{ padding: 16 }}>{dom}</Popover>
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group>
          <Avatar src={url}></Avatar>
          <Avatar src={url}></Avatar>
          <Avatar src={url}></Avatar>
          <Avatar src={url}></Avatar>
          <Avatar src={url}></Avatar>
        </Avatar.Group>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group max={3}>
          <Avatar icon={userIcon}></Avatar>
          <Avatar icon={userIcon}></Avatar>
          <Avatar icon={userIcon}></Avatar>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
          <Avatar>F</Avatar>
        </Avatar.Group>
      </div>
      <div>
        <Avatar.Group max={3} renderMax={renderMax}>
          <Avatar icon={userIcon}></Avatar>
          <Avatar icon={userIcon}></Avatar>
          <Avatar icon={userIcon}></Avatar>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
          <Avatar>F</Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};
