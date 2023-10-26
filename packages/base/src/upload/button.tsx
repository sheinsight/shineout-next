import React, { isValidElement } from 'react';
import Upload from './upload';
import Button from '../button';
import Spin from '../spin';
import { ButtonUploadInnerPropsType, UploadButtonProps } from './button.type';
import { usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.keyCode === 13) (e.target as HTMLElement).click();
};

const UploadButton = <T,>(props: UploadButtonProps<T>) => {
  const innerProps: ButtonUploadInnerPropsType = {
    listType: 'text',
    imageStyle: undefined,
    canDelete: undefined,
    showUploadList: false,
    customResult: undefined,
    drop: false,
    multiple: false,
    gapProps: undefined,
    leftHandler: false,
    onPreview: undefined,
    renderContent: undefined,
    recoverAble: false,
  };

  const uploadClasses = props.jssStyle?.upload?.();
  const [process, setProcess] = React.useState(-1);
  const onProgress = usePersistFn((file: { process: number }) => {
    setProcess(file.process);
  });
  const onStart = usePersistFn(() => {
    setProcess(0);
  });
  const onHttpError: UploadButtonProps<T>['onHttpError'] = usePersistFn((xhr, file) => {
    setProcess(-1);
    return props.onHttpError ? props.onHttpError(xhr, file) : undefined;
  });

  const onSuccess: UploadButtonProps<T>['onSuccess'] = usePersistFn((value, file, data) => {
    console.log('success');
    setProcess(-1);
    return props.onSuccess ? props.onSuccess(value, file, data) : value;
  });

  const onClick = usePersistFn((e) => {
    if (process >= 0) {
      e.stopPropagation();
    }
  });

  const renderLoadingView = (color?: string) => {
    const { placeholder, loading } = props;
    return isValidElement(loading) ? (
      <span>{loading}</span>
    ) : (
      <span>
        <span className={uploadClasses?.buttonBgSpin}>
          <Spin jssStyle={props.jssStyle} size={10} name='ring' color={color} />
        </span>
        {typeof loading === 'string' ? loading : placeholder}
      </span>
    );
  };

  const uploading = process >= 0;
  const style = {
    right: uploading ? `${100 - Math.min(99, process)}%` : '100%',
  };
  return (
    <Upload
      {...props}
      {...innerProps}
      onProgress={onProgress}
      onStart={onStart}
      onSuccess={onSuccess}
      onHttpError={onHttpError}
    >
      <Button
        jssStyle={props.jssStyle}
        tabIndex={props.disabled ? -1 : 0}
        disabled={props.disabled}
        className={classNames(uploadClasses?.button, uploading && uploadClasses?.buttonUploading)}
        type={props.type || 'primary'}
        size={props.size}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {uploading && [
          <div key={'cover'} className={uploadClasses?.buttonCover} />,
          <div key={'bg'} style={style} className={uploadClasses?.buttonBg}>
            {renderLoadingView('#fff')}
          </div>,
        ]}
        <span>{uploading ? renderLoadingView() : props.placeholder}</span>
      </Button>
    </Upload>
  );
};

export default UploadButton;
