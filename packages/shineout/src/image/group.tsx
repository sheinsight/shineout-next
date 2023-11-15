import { ImageGroupProps } from './group.type';
import { ImageGroup as UnStyledImageGroup } from '@sheinx/base';
import { useImageStyle } from '@sheinx/shineout-style';

const jssStyle = {
  image: useImageStyle,
};
const ImageGroup = (props: ImageGroupProps) => {
  return <UnStyledImageGroup {...props} jssStyle={jssStyle} />;
};

export default ImageGroup;
