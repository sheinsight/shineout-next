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

  // 同 upload.tsx：useFieldCommon 会把 name 从子组件 props 中移除，
  // 提前将其作为 htmlName 的 fallback 保存，以兼容 v2 中 name 作为 FormData 键名的行为。
  const htmlName = props.htmlName ?? (typeof props.name === 'string' ? props.name : undefined);

  return useFieldCommon({ ...props, htmlName, ...customProps }, BaseUploadImage<T>);
};
