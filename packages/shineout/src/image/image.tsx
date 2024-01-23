import React from 'react';
import { Image as UnStyledImage } from '@sheinx/base';
import { useImageStyle, useSpinStyle } from '@sheinx/shineout-style';
import { ImageProps } from './image.type';

const jssStyle = {
  image: useImageStyle,
  spin: useSpinStyle,
};
const Image = (props: ImageProps) => {
  return <UnStyledImage {...props} jssStyle={jssStyle}></UnStyledImage>;
};

export default Image;
