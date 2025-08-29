import { Upload } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { BaseUploadProps, UploadProps } from './upload.type';
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

const BaseUpload = <T,>(props: BaseUploadProps<T>) => {
  return <Upload jssStyle={jssStyle} {...props} />;
};

BaseUpload.displayName = 'ShineoutUpload';

export default <T,>(props: UploadProps<T>) => {
  const customProps = useUploadCommon({ rules: props.rules });

  return useFieldCommon({ ...props, ...customProps }, BaseUpload<T>, 'array');
};
