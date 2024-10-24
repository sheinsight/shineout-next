// import React from 'react';
// import { BaseAvatarProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';


export interface AvatarClasses {
  wrapper: string;
}

export interface AvatarProps extends Pick<CommonType, 'className' | 'style'> {
    jssStyle?: {
        avatar: () => AvatarClasses;
    };

    //...
}
