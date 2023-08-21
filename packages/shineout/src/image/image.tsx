import React, { useMemo } from 'react';
import { Image as UnStyledImage } from '@sheinx/base';
import { useImageStyle } from '@sheinx/shineout-style';
import { ImageProps } from './image.type';

const Image = (props: ImageProps) => {
  const imageStyle = useImageStyle();
  const jssStyle = useMemo(() => ({ image: imageStyle }), [imageStyle]);
  return <UnStyledImage {...props} jssStyle={jssStyle}></UnStyledImage>;
};

export default Image;
