import { Upload } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { UploadProps } from './upload.type';

const jssStyle = {
  upload: useUploadStyle,
  spin: useSpinStyle,
  popover: usePopoverStyle,
  alert: useAlertStyle,
  button: useButtonStyle,
  image: useImageStyle,
};
export default <T,>(props: UploadProps<T>) => {
  return <Upload jssStyle={jssStyle} {...props} />;
};
