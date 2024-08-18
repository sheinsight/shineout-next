// import React from 'react';
// import { BaseBadgeProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';


export interface BadgeClasses {
  wrapper: string;
}

export interface BadgeProps extends Pick<CommonType, 'className' | 'style'> {
    jssStyle?: {
        badge: () => BadgeClasses;
    };

    //...
}
