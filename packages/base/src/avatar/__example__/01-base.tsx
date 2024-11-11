/**
* cn - 基本用法
*    --
* en - Basic
*    --
 */
import React from 'react';
import { Avatar } from '@sheinx/base';
import { useAvatarStyle } from '@sheinx/shineout-style';

const jssStyle = {
  avatar: useAvatarStyle
}

export default () => {
  return (
    <div>
      <Avatar jssStyle={jssStyle} />
    </div>
  );
};
