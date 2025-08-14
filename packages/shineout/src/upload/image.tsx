import { UploadImage } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { BaseUploadImageProps, UploadImageProps } from './image.type';
import useFieldCommon from '../hooks/use-field-common';
import useUploadCommon from './use-upload-common';

const jssStyle = {
  upload: useUploadStyle,
  spin: useSpinStyle,
  popover: usePopoverStyle,
  alert: useAlertStyle,
  button: useButtonStyle,
  image: useImageStyle,
};
const BaseUploadImage = <T,>(props: BaseUploadImageProps<T>) => {
  return <UploadImage jssStyle={jssStyle} {...props} />;
};

BaseUploadImage.displayName = 'ShineoutUploadImage';

export default <T,>(props: UploadImageProps<T>) => {
  const customProps = useUploadCommon({ rules: props.rules });

  return useFieldCommon({ ...props, ...customProps }, BaseUploadImage<T>);
};
