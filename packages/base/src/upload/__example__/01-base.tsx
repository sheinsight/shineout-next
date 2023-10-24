/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { UploadButton } from '@sheinx/base';
import { useButtonStyle, useSpinStyle, useUploadStyle } from '@sheinx/shineout-style';

const jssStyle = {
  button: useButtonStyle,
  upload: useUploadStyle,
  spin: useSpinStyle,
};

export default () => {
  return (
    <div>
      <UploadButton
        withCredentials
        action={'/api/upload'}
        htmlName={'file'}
        onSuccess={(res, file) => {
          console.log(res, file);
          return file.name;
        }}
        jssStyle={jssStyle}
        accept={'image/*'}
        placeholder={'点击上传'}
        loading={'正在上传...'}
      />
    </div>
  );
};
