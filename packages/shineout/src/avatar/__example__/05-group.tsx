/**
 * cn - 头像组
 *    -- 通过配置 `max` 属性设置最大展示个数，超过则隐藏显示，如果需要个性化展示超出内容，可以使用 `renderMax` 属性
 * en - Group
 *    -- Set the maximum number of avatars displayed by configuring the `max` property. If it exceeds, it will be hidden. If you need to display the content beyond the personalized display, you can use the `renderMax` property
 */
import React from 'react';
import { Avatar, Popover, icons } from 'shineout';

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
        <Avatar><div style={{ width: 16, height: 16, display: 'flex' }}>{icons.More}</div></Avatar>
        <Popover style={{ padding: 16, display: 'flex', gap: 8 }}>{dom}</Popover>
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
