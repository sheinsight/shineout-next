import { UploadButton } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  useImageStyle,
  usePopoverStyle,
  useSpinStyle,
  useUploadStyle,
} from '@sheinx/shineout-style';
import { BaseUploadButtonProps, UploadButtonProps } from './button.type';
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
const BaseUploadButton = <T,>(props: BaseUploadButtonProps<T>) => {
  return <UploadButton jssStyle={jssStyle} {...props} />;
};

export default <T,>(props: UploadButtonProps<T>) => {
  const customProps = useUploadCommon({ rules: props.rules });

  return useFieldCommon<BaseUploadButtonProps<T>, BaseUploadButtonProps<T>['value']>(
    { ...props, ...customProps },
    BaseUploadButton,
  );
};
