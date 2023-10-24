import { UploadButton } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { UploadButtonProps } from './button.type';

const jssStyle = {
  upload: useUploadStyle,
  spin: useSpinStyle,
  popover: usePopoverStyle,
  alert: useAlertStyle,
  button: useButtonStyle,
  image: useImageStyle,
};
export default <T,>(props: UploadButtonProps<T>) => {
  return <UploadButton jssStyle={jssStyle} {...props} />;
};
