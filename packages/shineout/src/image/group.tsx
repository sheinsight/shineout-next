import { ImageGroupProps } from './group.type';
import { ImageGroup as UnStyledImageGroup } from '@sheinx/base';
import { useImageStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const ImageGroup = (props: ImageGroupProps) => {
  const imageGroupStyle = useImageStyle();
  const jssStyle = useMemo(() => ({ imageGroup: imageGroupStyle }), [imageGroupStyle]);
  return <UnStyledImageGroup {...props} jssStyle={jssStyle} />;
};

export default ImageGroup;
