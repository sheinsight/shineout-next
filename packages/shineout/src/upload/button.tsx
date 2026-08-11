import { UploadButton } from '@sheinx/base';
import { util } from '@sheinx/hooks';
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

BaseUploadButton.displayName = 'ShineoutUploadButton';

export default <T,>(props: UploadButtonProps<T>) => {
  const customProps = useUploadCommon({ rules: props.rules });

  // 同 upload.tsx：useFieldCommon 会把 name 从子组件 props 中移除，
  // 提前将其作为 htmlName 的 fallback 保存，以兼容 v2 中 name 作为 FormData 键名的行为。
  const htmlName = props.htmlName ?? (typeof props.name === 'string' ? props.name : undefined);

  if (!props.htmlName && typeof props.name === 'string' && props.name !== 'file') {
    util.devUseWarning.warn(
      `Upload.Button 的 name="${props.name}" 会作为上传请求 FormData 的字段名。如需保持默认字段名 "file"，请显式设置 htmlName="file"。`
    );
  }

  return useFieldCommon({ ...props, htmlName, ...customProps }, BaseUploadButton<T>);
};
