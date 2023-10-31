import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Spin from '../spin';
import { UploadProps } from './upload.type';
import Image from '../image';
import { PopoverConfirm, PopoverConfirmProps } from '../popover';
import icons from '../icons';

interface ResultProps {
  onRemove: () => void;
  removeAble: boolean;
  name: React.ReactNode;
  message?: React.ReactNode | undefined;
  status: 'error' | 'success' | 'uploading' | 'deleted';
  process?: number;
  jssStyle?: UploadProps<any>['jssStyle'];
  confirm?: PopoverConfirmProps | string;
  src?: string;
  imageStyle?: React.CSSProperties;
  listType: UploadProps<any>['listType'];
  customImage?: React.ReactNode;
  onPreview?: UploadProps<any>['onPreview'];
  values: any[];
  index: number;
}
const Result = (props: ResultProps) => {
  const uploadClasses = props.jssStyle?.upload?.();
  const { status, name, message, confirm, listType, src } = props;
  const [isConfirm, setIsConfirm] = useState(false);
  const confirmProps = typeof confirm === 'string' ? { children: confirm } : confirm;
  const { current: context } = useRef({ preview: () => {} });

  const renderText = () => {
    return (
      <>
        <div className={uploadClasses?.resultText}>
          <div className={uploadClasses?.icon}>{icons.File}</div>
          <div className={uploadClasses?.resultTextBody}>
            {name}
            {message && <span>({message}) </span>}
          </div>
          <div className={uploadClasses?.resultTextFooter}>
            <div className={classNames(uploadClasses?.icon, uploadClasses?.resultStatusIcon)}>
              {status === 'uploading' && <Spin jssStyle={props.jssStyle} size={10} name={'ring'} />}
              {status === 'success' && icons.PcCheckCircleFill}
              {status === 'error' && icons.PcWarningCircleFill}
            </div>
            {status === 'uploading' && props.process !== -1 && (
              <div>{Math.min(99, Math.floor(props.process || 0))}%</div>
            )}
          </div>
        </div>
        {props.removeAble && (
          <div
            className={classNames(
              uploadClasses?.resultClose,
              uploadClasses?.icon,
              uploadClasses?.iconHover,
            )}
            onClick={confirmProps ? undefined : props.onRemove}
          >
            {confirmProps && (
              <PopoverConfirm {...confirmProps} onOk={props.onRemove} jssStyle={props.jssStyle} />
            )}
            {status === 'deleted' ? icons.Recover : icons.Delete}
          </div>
        )}
      </>
    );
  };
  const renderImage = () => {
    const topBtn = (
      <div
        className={classNames(
          uploadClasses?.icon,
          uploadClasses?.imageResultTopBtn,
          uploadClasses?.customImageBtn,
        )}
        onClick={props.onRemove}
      >
        {status === 'deleted' ? icons.RecoverCircle : icons.CloseCircle}
      </div>
    );

    const errorTip = status === 'error' && message && (
      <div className={uploadClasses?.imageResultTip}>{message}</div>
    );
    if (props.customImage) {
      return (
        <>
          {props.customImage}
          {topBtn}
          {errorTip}
        </>
      );
    }
    return (
      <>
        {src && (
          <Image
            componentRef={(img) => {
              context.preview = img.preview;
            }}
            className={uploadClasses?.imageBg}
            src={src}
            jssStyle={props.jssStyle}
            fit='center'
            width='auto'
            height={0}
          />
        )}
        <div
          className={classNames(
            uploadClasses?.imageResultMask,
            (isConfirm || status === 'uploading') && uploadClasses?.imageResultMaskShow,
          )}
        >
          <div className={uploadClasses?.imageResultMaskOperator}>
            {status === 'uploading' && (
              <Spin
                size={'null'}
                jssStyle={props.jssStyle}
                name={'ring'}
                className={uploadClasses?.imageResultLoading}
              />
            )}
            {(status === 'success' || status === 'deleted') && src && (
              <div
                className={classNames(uploadClasses?.icon)}
                onClick={() => {
                  if (props.onPreview) {
                    props.onPreview(src, props.values[props.index], props.index, props.values, {
                      preview: context.preview,
                    });
                  } else {
                    context.preview();
                  }
                }}
              >
                {icons.ImagePreview}
              </div>
            )}
            {status === 'success' && props.removeAble && (
              <div
                className={classNames(uploadClasses?.icon)}
                onClick={confirmProps ? undefined : props.onRemove}
              >
                {confirmProps && (
                  <PopoverConfirm
                    onVisibleChange={setIsConfirm}
                    {...confirmProps}
                    onOk={props.onRemove}
                    jssStyle={props.jssStyle}
                  />
                )}
                {icons.Delete}
              </div>
            )}
          </div>
          {status === 'uploading' && props.process !== -1 && (
            <div className={uploadClasses?.imageResultMaskInfo}>
              {Math.min(99, Math.floor(props.process || 0))}%
            </div>
          )}
        </div>

        {status !== 'success' && props.removeAble && topBtn}
        {errorTip}
      </>
    );
  };
  return (
    <div
      className={classNames(
        listType === 'image' ? uploadClasses?.imageResult : uploadClasses?.result,
        status === 'error' && uploadClasses?.resultError,
        status === 'success' && uploadClasses?.resultSuccess,
        status === 'uploading' && uploadClasses?.resultUploading,
        status === 'deleted' && uploadClasses?.resultDeleted,
      )}
      style={listType === 'image' ? props.imageStyle : undefined}
    >
      {listType === 'image' ? renderImage() : renderText()}
    </div>
  );
};

export default Result;
