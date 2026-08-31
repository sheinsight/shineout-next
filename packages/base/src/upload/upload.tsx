import { getDataset, useInputAble, usePersistFn, useUpload, util } from '@sheinx/hooks';
import React, { useContext, useEffect } from 'react';
import { UploadProps, UploadRef, UploadSemanticKey } from './upload.type';
import Drop from './drop';
import classNames from 'classnames';
import Result from './result';
import { useInputClick } from './useInputClick';
import { getLocale, useConfig } from '../config';
import icons from '../icons';
import { produce } from 'immer';
import useWithFormConfig from '../common/use-with-form-config';
import { FormFieldContext } from '../form/form-field-context';
import { useSemantic } from '../common/use-semantic';

const Upload = <T,>(props0: UploadProps<T>) => {
  const props = useWithFormConfig(props0);
  const {
    canDelete = true,
    showUploadList = true,
    drop = false,
    paste = false,
    limit = 100,
    renderResult = (a: any) => a as React.ReactNode,
    listType = 'text',
    leftHandler,
    hideHandler = false,
  } = props;

  const config = useConfig();
  const { locale } = config;
  const uploadClasses = props.jssStyle?.upload?.();

  const [semClass, semStyle] = useSemantic<UploadSemanticKey>(
    props.classNames,
    props.styles,
    config.upload,
  );
  const imageStyle = {
    ...props.imageStyle,
    width: props.imageStyle?.width || 80,
    height: props.imageStyle?.height || 80,
  };

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

  const name = (props as any).name;
  const { func, files, recycleValues, accept, restLength } = useUpload({
    ...props,
    htmlName: props.htmlName || name,
    isImage,
    text: {
      forceAcceptErrorMsg: props.forceAcceptErrorMsg || getLocale(locale, 'invalidAccept'),
      invalidImage: getLocale(locale, 'invalidImage'),
    },
    value: value,
    onChange,
    functionalOnChange: props.functionalOnChange,
  });

  const uploadValidate = usePersistFn(() => {
    return new Promise((resolve, reject) => {
      if (Object.keys(files).length > 0) {
        reject(new Error(''));
      } else {
        resolve(true);
      }
    });
  });

  useEffect(() => {
    const { validateHook } = props as any;
    if (validateHook && util.isFunc(uploadValidate)) {
      validateHook(uploadValidate);
    }
  }, []);

  // 暴露 getComponentRef
  useEffect(() => {
    const { getComponentRef } = props;
    if (!getComponentRef) return;
    const ref: UploadRef = { addFiles: (files) => func.addFiles(files) };
    if (util.isFunc(getComponentRef)) {
      (getComponentRef as (ref: UploadRef) => void)(ref);
    } else {
      (getComponentRef as { current?: UploadRef }).current = ref;
    }
  }, []);

  // paste 处理：document 级别监听，因为 Upload 没有可聚焦的空白区域
  useEffect(() => {
    if (!paste) return;
    const handlePaste = async (e: ClipboardEvent) => {
      if (props.disabled) return;
      let files: FileList | undefined;
      if (props.beforePaste && util.isFunc(props.beforePaste)) {
        files = await props.beforePaste(e as unknown as React.ClipboardEvent);
      } else {
        files = e.clipboardData?.files;
      }
      if (!files || files.length === 0) return;
      const filtered = accept
        ? (Array.from(files).filter((f) => util.attrAccept(f, accept)) as File[])
        : Array.from(files);
      if (filtered.length === 0) return;
      const toAdd = props.multiple || limit > 1 ? filtered : [filtered[0]];
      func.addFiles(toAdd);
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [paste, props.disabled, accept, props.multiple, limit, props.beforePaste]);

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

    const inputOriginProps: {
      webkitdirectory?: string;
    } = {};

    if (props.webkitdirectory) {
      inputOriginProps.webkitdirectory = 'true';
    }

    return (
      <Drop
        drop={drop}
        accept={accept}
        disabled={props.disabled}
        onDrop={func.addFiles}
        beforeDrop={props.beforeDrop}
        multiple={!!props.multiple || limit > 1}
        className={classNames(uploadClasses?.dropItem)}
      >
        <span
          className={classNames(
            listType === 'image' ? uploadClasses?.imageHandler : uploadClasses?.handler,
            semClass('handler'),
          )}
          style={listType === 'image' ? { ...imageStyle, ...semStyle('handler') } : semStyle('handler')}
          {...wrapperProps}
          role='button'
        >
          {listType === 'image' &&
            (props.children || (
              <div className={uploadClasses?.imageHandlerIcon}>{icons.upload.AddImage}</div>
            ))}
          {listType === 'text' && props.children}
          <input
            accept={accept}
            multiple={props.multiple}
            disabled={props.disabled}
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
    onPreview: props.onPreview,
    semClass,
    semStyle,
  };

  const renderFile = () => {
    if (!showUploadList) return null;
    return Object.keys(files).map((id, index) => {
      const file = files[id];
      return (
        <Result
          {...commonResultProps}
          values={Object.values(files)}
          index={index}
          key={index}
          onRemove={() => {
            func.removeFile(id);
          }}
          src={file.src}
          name={file.name}
          message={file.message}
          status={file.status}
          process={file.process}
          removeAble={!props.disabled}
        />
      );
    });
  };

  const renderValue = () => {
    if (!showUploadList) return null;
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
            values={value}
            index={index}
            status={2}
            name={!isImage && renderResult(v)}
            src={isImage ? (renderResult(v) as string) : ''}
            removeAble={
              !props.disabled && (util.isFunc(canDelete) ? canDelete(v, index) : canDelete)
            }
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
    if (!showUploadList) return null;
    return recycleValues.map((v, index) => {
      return (
        <Result
          {...commonResultProps}
          values={recycleValues}
          index={index}
          status={-1}
          onRemove={() => {
            func.recoverValue(index);
          }}
          name={!isImage && renderResult(v)}
          src={isImage ? (renderResult(v) as string) : ''}
          removeAble={!props.disabled && restLength > 0}
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
  const renderCustomResult = props.customResult;
  const shouldRenderLeft = listType !== 'image' || leftHandler;
  const { fieldId } = useContext(FormFieldContext);
  return (
    <div
      id={fieldId}
      style={{ ...props.style, ...semStyle('root') }}
      className={classNames(
        uploadClasses?.rootClass,
        uploadClasses?.wrapper,
        isImage && uploadClasses?.wrapperImage,
        drop && uploadClasses?.wrapperDrop,
        props.disabled && uploadClasses?.wrapperDisabled,
        props.className,
        semClass('root'),
      )}
      {...getDataset(props)}
    >
      {renderCustomResult ? (
        <>
          {shouldRenderLeft && renderHandler()}
          {renderCustomResult({
            value,
            files,
            filesInstances: renderFile(),
            valueInstances: renderValue(),
            onFileRemove: func.removeFile,
            onValueRemove: func.removeValue,
            recoverValue: recycleValues,
            handler: renderHandler(),
            onValueRecover: func.recoverValue,
          })}
          {!shouldRenderLeft && !hideHandler && renderHandler()}
        </>
      ) : (
        <>
          {shouldRenderLeft && !hideHandler && renderHandler()}
          {renderValue()}
          {renderFile()}
          {!shouldRenderLeft && !hideHandler && renderHandler()}
          {renderRecover()}
        </>
      )}
    </div>
  );
};

export default Upload;
