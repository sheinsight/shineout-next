import React, { useState } from 'react';
import { util } from '@sheinx/hooks';

import { UploadProps } from './upload.type';

export interface DropProps
  extends Pick<UploadProps<any>, 'drop' | 'accept' | 'disabled' | 'multiple'> {
  dropData?: any;
  onDrop?: (files: File[], index: number) => void;
  className?: string;
  children?: React.ReactNode;
}
const useDrop = (props: DropProps) => {
  const [isoOver, setOver] = useState(false);
  const handleFileDrop = (e: React.DragEvent) => {
    const { files } = e.dataTransfer;
    const { accept, multiple, onDrop, dropData } = props;
    const filter = accept
      ? (Array.prototype.filter.call(files, (f: File) => util.attrAccept(f, accept)) as File[])
      : Array.from(files);
    if (!filter || filter.length === 0) return;
    if (onDrop) onDrop(multiple ? filter : [filter[0]], dropData);
  };

  const handleDrag = (e: React.DragEvent) => {
    const { disabled } = props;
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setOver(e.type === 'dragover');
    if (e.type === 'drop') handleFileDrop(e);
  };

  const getDropProps = () => {
    return {
      onDragOver: handleDrag,
      onDragLeave: handleDrag,
      onDrop: handleDrag,
    };
  };

  return {
    isoOver,
    getDropProps,
  };
};

const Drop = (props: DropProps) => {
  const { isoOver, getDropProps } = useDrop(props);
  if (!props.drop) return <>{props.children}</>;
  return (
    <span
      {...getDropProps()}
      className={props.className}
      {...util.getDataAttribute({ dragover: isoOver ? 'true' : 'false' })}
    >
      {props.children}
    </span>
  );
};

export default Drop;
