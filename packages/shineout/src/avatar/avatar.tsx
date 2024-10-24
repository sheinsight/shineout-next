import React from 'react';
import { Avatar } from '@sheinx/base';
import { useAvatarStyle } from '@sheinx/shineout-style';
import { AvatarProps } from './avatar.type';


const jssStyle = {
    avatar: useAvatarStyle
}
export default (props: AvatarProps) => {
    return (
        <Avatar
            jssStyle={jssStyle}
            {...props}
        />
  );
}
