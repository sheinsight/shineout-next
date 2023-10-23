/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Button, Upload } from '@sheinx/base';
import { useButtonStyle, useSpinStyle, useUploadStyle } from '@sheinx/shineout-style';

const jssStyle = {
  button: useButtonStyle,
  upload: useUploadStyle,
  spin: useSpinStyle,
};

export default () => {
  return (
    <div>
      <Upload
        withCredentials
        beforeCancel={(f) => {
          console.log('beforeCancel', f);
        }}
        recoverAble
        action={'/api/upload'}
        htmlName={'file'}
        onSuccess={(res, file) => {
          console.log(res, file);
          return file.name;
        }}
        jssStyle={jssStyle}
        accept={'image/*'}
      >
        <Button jssStyle={jssStyle} size={'small'} mode={'outline'}>
          上传文件
        </Button>
      </Upload>
    </div>
  );
};
