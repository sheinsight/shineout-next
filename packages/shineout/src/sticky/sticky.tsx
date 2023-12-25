import React from 'react';
import { Sticky } from '@sheinx/base';
import { useStickyStyle } from '@sheinx/shineout-style';
import { StickyProps } from './sticky.type';

const jssStyle = {
  sticky: useStickyStyle,
};
export default (props: StickyProps) => {
  return <Sticky jssStyle={jssStyle} {...props} />;
};
