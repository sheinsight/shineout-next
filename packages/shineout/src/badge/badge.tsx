import React from 'react';
import { Badge } from '@sheinx/base';
import { useBadgeStyle } from '@sheinx/shineout-style';
import { BadgeProps } from './badge.type';

const jssStyle = {
  badge: useBadgeStyle,
};
export default (props: BadgeProps) => {
  return <Badge jssStyle={jssStyle} {...props} />;
};
