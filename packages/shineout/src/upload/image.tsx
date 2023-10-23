import { UploadImage } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { UploadImageProps } from './image.type';

const jssStyle = {
  upload: useUploadStyle,
  spin: useSpinStyle,
  popover: usePopoverStyle,
  alert: useAlertStyle,
  button: useButtonStyle,
  image: useImageStyle,
};
export default <T,>(props: UploadImageProps<T>) => {
  return <UploadImage jssStyle={jssStyle} {...props} />;
};
