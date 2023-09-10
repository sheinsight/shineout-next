import { TagProps as UnStyledTagProps, TagInputProps as UnStyledTagInputProps } from '@sheinx/base';
export type TagProps = Omit<UnStyledTagProps, 'jssStyle'>;
export type TagInputProps = Omit<UnStyledTagInputProps, 'jssStyle'>;
