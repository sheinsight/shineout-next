import { UploadProps as UnStyledUploadProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseUploadProps<T> = Omit<UnStyledUploadProps<T>, 'jssStyle'>;

/**
 *  @title Upload
 */
export type UploadProps<T> = GetWithFieldProps<BaseUploadProps<T>, BaseUploadProps<T>['value']>;

export type Validator = Exclude<BaseUploadProps<any>['validator'], undefined>;
