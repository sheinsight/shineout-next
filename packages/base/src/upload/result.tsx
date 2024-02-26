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
  // error: 3, success: 2, uploading: 1, deleted: -1
  status: 3 | 2 | 1 | -1;
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
              {status === 1 && <Spin jssStyle={props.jssStyle} size={10} name={'ring'} />}
              {status === 2 && icons.PcCheckCircleFill}
              {status === 3 && icons.PcWarningCircleFill}
            </div>
            {status === 1 && props.process !== -1 && (
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
              <PopoverConfirm
                position='top'
                {...confirmProps}
                onOk={props.onRemove}
                jssStyle={props.jssStyle}
              />
            )}
            {status === -1 ? icons.Return : icons.Delete}
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
        {status === -1 ? icons.UndeleteOpaque : icons.CloseOpaqueMultic1}
      </div>
    );

    const errorTip = status === -1 && message && (
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
            (isConfirm || status === 1) && uploadClasses?.imageResultMaskShow,
          )}
        >
          <div className={uploadClasses?.imageResultMaskOperator}>
            {status === 1 && (
              <Spin
                size={'null'}
                jssStyle={props.jssStyle}
                name={'ring'}
                className={uploadClasses?.imageResultLoading}
              />
            )}
            {(status === 2 || status === -1) && src && (
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
                {icons.Preview}
              </div>
            )}
            {status === 2 && props.removeAble && (
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
          {status === 1 && props.process !== -1 && (
            <div className={uploadClasses?.imageResultMaskInfo}>
              {Math.min(99, Math.floor(props.process || 0))}%
            </div>
          )}
        </div>

        {status !== 2 && props.removeAble && topBtn}
        {errorTip}
      </>
    );
  };
  return (
    <div
      className={classNames(
        listType === 'image' ? uploadClasses?.imageResult : uploadClasses?.result,
        status === 3 && uploadClasses?.resultError,
        status === 2 && uploadClasses?.resultSuccess,
        status === 1 && uploadClasses?.resultUploading,
        status === -1 && uploadClasses?.resultDeleted,
      )}
      style={listType === 'image' ? props.imageStyle : undefined}
    >
      {listType === 'image' ? renderImage() : renderText()}
    </div>
  );
};

export default Result;
