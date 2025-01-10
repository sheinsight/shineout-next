/**
 * cn - 头像组
 *    -- 通过配置 `max` 属性设置最大展示个数，超过则隐藏显示，如果需要个性化展示超出内容，可以使用 `renderMax` 属性
 * en - Group
 *    -- Set the maximum number of avatars displayed by configuring the `max` property. If it exceeds, it will be hidden. If you need to display the content beyond the personalized display, you can use the `renderMax` property
 */
import React from 'react';
import { Avatar, Popover } from 'shineout';

const url =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar';

const avatarImgIndex = [1, 2, 3, 4, 5, 6, 7, 8];

export default () => {
  const renderAvatars = () => {
    return avatarImgIndex.map((item, index) => {
      return <Avatar key={index} src={`${url}/0${item}.png`}></Avatar>;
    });
  };

  const renderMax = (dom: React.ReactNode[]) => {
    return (
      <div>
        <Avatar
          style={{ cursor: 'pointer' }}
          icon={
            <svg fill='var(--soui-neutral-text-4)' viewBox='0 0 24 24' width='16px' height='16px'>
              <path d='M4.00195 10C5.10652 10 6.00195 10.8954 6.00195 12C6.00195 13.1046 5.10652 14 4.00195 14C2.89738 14 2.00195 13.1046 2.00195 12C2.00195 10.8954 2.89738 10 4.00195 10ZM12.002 10C13.1065 10 14.002 10.8954 14.002 12C14.002 13.1046 13.1065 14 12.002 14C10.8974 14 10.002 13.1046 10.002 12C10.002 10.8954 10.8974 10 12.002 10ZM20.002 10C21.1065 10 22.002 10.8954 22.002 12C22.002 13.1046 21.1065 14 20.002 14C18.8974 14 18.002 13.1046 18.002 12C18.002 10.8954 18.8974 10 20.002 10Z'></path>
            </svg>
          }
        ></Avatar>
        <Popover style={{ padding: 16, display: 'flex', gap: 8, cursor: 'auto' }}>{dom}</Popover>
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group>{renderAvatars()}</Avatar.Group>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group max={3}>{renderAvatars()}</Avatar.Group>
      </div>
      <div>
        <Avatar.Group max={3} renderMax={renderMax}>
          {renderAvatars()}
        </Avatar.Group>
      </div>
    </div>
  );
};
