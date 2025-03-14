import Drop from './drop';
import { UploadDraggerProps } from './dragger.type';

const Dragger = <T,>(props: UploadDraggerProps<T>) => {
  const { children, multiple, addFile, accept, disabled, jssStyle, limit = 100 } = props;

  const uploadClasses = jssStyle?.upload?.();

  const handleDrop = (files: File[]) => {
    addFile?.({ files, fromDragger: true });
  };

  return (
    <Drop
      drop
      className={uploadClasses?.draggerWrapper}
      accept={accept}
      disabled={disabled}
      multiple={multiple || limit > 1}
      onDrop={handleDrop}
    >
      <div className={uploadClasses?.draggerArea}>{children}</div>
    </Drop>
  );
};

export default Dragger;
