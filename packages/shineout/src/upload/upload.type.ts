import { UploadProps as UnStyledUploadProps } from '@sheinx/base';

export type UploadProps<T> = Omit<UnStyledUploadProps<T>, 'jssStyle'>;

export type Validator = Exclude<UploadProps<any>['validator'], undefined>;
