import { UploadProps } from './upload.type';
import { DropProps } from './drop';

export interface UploadDraggerProps<T>
  extends Pick<UploadProps<T>, 'multiple' | 'jssStyle'>,
    Pick<DropProps, 'accept' | 'disabled'> {
  children: React.ReactNode;
  limit?: number;
  addFile?: (...args: any) => void;
}
