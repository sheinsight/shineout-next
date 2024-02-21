import {UploadProps as UnStyledUploadProps} from '@sheinx/base';
import {GetWithFieldProps} from '../hooks/use-field-common';

import type {UploadOptions as _UploadOptions} from '@sheinx/hooks';


export type BaseUploadProps<T> = Omit<UnStyledUploadProps<T>, 'jssStyle'>;

/**
 *  @title Upload
 *  @sort 0
 */
export type UploadProps<T> = GetWithFieldProps<BaseUploadProps<T>, BaseUploadProps<T>['value']>;




/**
 * @title UploadOptions
 * @sort 3
 */
export type UploadOptions<T> = _UploadOptions<T>;

/**
 * @title Validator
 * @sort 4
 */
export type Validator = Exclude<BaseUploadProps<any>['validator'], undefined>;


