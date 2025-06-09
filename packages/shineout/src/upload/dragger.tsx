import { UploadDragger } from '@sheinx/base';
import { useUploadStyle } from '@sheinx/shineout-style';
import { UploadDraggerProps } from './dragger.type';

const jssStyle = {
  upload: useUploadStyle,
};

const BaseUploadDragger = <T,>(props: UploadDraggerProps<T>) => {
  return <UploadDragger jssStyle={jssStyle} {...props} />;
};

export default BaseUploadDragger;
