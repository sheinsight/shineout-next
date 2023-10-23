import { useInputAble, useUpload, util } from '@sheinx/hooks';
import React from 'react';
import { UploadProps } from './upload.type';
import Drop from './drop';
import classNames from 'classnames';
import Result from './result';
import { useInputClick } from './useInputClick';
import { getLocale, useConfig } from '../config';
import icons from '../icons';
import { produce } from 'immer';

const Upload = <T,>(props: UploadProps<T>) => {
  const {
    canDelete = true,
    drop = false,
    limit = 100,
    renderResult = (a: any) => a as React.ReactNode,
    listType = 'text',
    leftHandler,
  } = props;
  const { locale } = useConfig();
  const uploadClasses = props.jssStyle?.upload?.();
  const imageStyle = { width: 80, height: 80, ...props.imageStyle };

  const inputAbleProps = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue || [],
    beforeChange: props.beforeChange,
    onChange: props.onChange,
    control: 'value' in props,
  });
  const value = inputAbleProps.value || [];
  const onChange = inputAbleProps.onChange;
  const isImage = listType === 'image';

  const { func, files, recycleValues, accept, restLength } = useUpload({
    ...props,
    isImage,
    text: {
      forceAcceptErrorMsg: props.forceAcceptErrorMsg || getLocale(locale, 'invalidAccept'),
      invalidImage: getLocale(locale, 'invalidImage'),
    },
    value: value,
    onChange,
  });

  const handleReplace = (files: File[], index: number) => {
    onChange(
      produce(value, (draft) => {
        // 删除原来的位置的数据
        draft.splice(index, 1);
      }),
    );
    setTimeout(() => {
      func.addFiles(files);
    });
  };

  const { inputProps, wrapperProps } = useInputClick();

  const renderHandler = () => {
    if (restLength <= 0) return null;

    const inputOriginProps = { webkitdirectory: props.webkitdirectory };

    return (
      <Drop
        drop={drop}
        accept={accept}
        disabled={props.disabled}
        onDrop={func.addFiles}
        multiple={!!props.multiple || limit > 1}
        className={classNames(uploadClasses?.dropItem)}
      >
        <span
          className={classNames(
            listType === 'image' ? uploadClasses?.imageHandler : uploadClasses?.handler,
            props.disabled && uploadClasses?.handlerDisabled,
          )}
          style={listType === 'image' ? imageStyle : undefined}
          {...wrapperProps}
        >
          {listType === 'image' &&
            (props.children || <div className={uploadClasses?.imageHandlerIcon}>{icons.Add}</div>)}
          {listType === 'text' && props.children}
          <input
            accept={accept}
            multiple={props.multiple}
            onChange={(e) => {
              func.addFiles(Array.from(e.target.files || []));
            }}
            {...inputProps}
            {...inputOriginProps}
          />
        </span>
      </Drop>
    );
  };

  const commonResultProps = {
    listType,
    jssStyle: props.jssStyle,
    imageStyle,
  };

  const renderFile = () => {
    return Object.keys(files).map((id, index) => {
      const file = files[id];
      return (
        <Result
          {...commonResultProps}
          key={index}
          onRemove={() => {
            func.removeFile(id);
          }}
          src={file.src}
          name={file.name}
          message={file.message}
          status={file.status}
          process={file.process}
          removeAble
        />
      );
    });
  };

  const renderValue = () => {
    return value.map((v, index) => {
      return (
        <Drop
          drop={drop}
          multiple={false}
          className={classNames(uploadClasses?.dropItem)}
          key={index}
          accept={accept}
          dropData={index}
          disabled={props.disabled}
          onDrop={handleReplace}
        >
          <Result
            {...commonResultProps}
            status={'success'}
            name={!isImage && renderResult(v)}
            src={isImage ? (renderResult(v) as string) : ''}
            removeAble={util.isFunc(canDelete) ? canDelete(v, index) : canDelete}
            onRemove={() => {
              func.removeValue(index);
            }}
            key={index}
            customImage={
              isImage &&
              props.renderContent &&
              props.renderContent(renderResult(v) as string, v, index, value)
            }
            confirm={props.removeConfirm}
          />
        </Drop>
      );
    });
  };
  const renderRecover = () => {
    return recycleValues.map((v, index) => {
      return (
        <Result
          {...commonResultProps}
          status={'deleted'}
          onRemove={() => {
            func.recoverValue(index);
          }}
          name={!isImage && renderResult(v)}
          src={isImage ? (renderResult(v) as string) : ''}
          removeAble={restLength > 0}
          key={index}
          customImage={
            isImage &&
            props.renderContent &&
            props.renderContent(renderResult(v) as string, v, index, value)
          }
        />
      );
    });
  };
  const CustomResult = props.customResult;
  const shouldRenderLeft = listType !== 'image' || leftHandler;
  return (
    <div
      style={props.style}
      className={classNames(
        uploadClasses?.wrapper,
        isImage && uploadClasses?.wrapperImage,
        drop && uploadClasses?.wrapperDrop,
        props.className,
      )}
    >
      {CustomResult ? (
        <>
          {shouldRenderLeft && renderHandler()}
          <CustomResult
            value={value}
            files={files}
            onFileRemove={func.removeFile}
            onValueRemove={func.removeValue}
          />
          {!shouldRenderLeft && renderHandler()}
        </>
      ) : (
        <>
          {shouldRenderLeft && renderHandler()}
          {renderValue()}
          {renderFile()}
          {!shouldRenderLeft && renderHandler()}
          {renderRecover()}
        </>
      )}
    </div>
  );
};

export default Upload;
