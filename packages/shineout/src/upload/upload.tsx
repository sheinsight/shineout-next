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

  // useFieldCommon 会把 name 从转发给子组件的 props 中移除（name 被用作 Form 字段 key）。
  // 但 Upload 的 name 在 v2 中同时作为 FormData 的键名，为了兼容 v2 行为，
  // 在 name 被移除之前将其作为 htmlName 的 fallback 保存下来。
  const htmlName = props.htmlName ?? (typeof props.name === 'string' ? props.name : undefined);

  return useFieldCommon({ ...props, htmlName, ...customProps }, BaseUpload<T>, 'array');
};
