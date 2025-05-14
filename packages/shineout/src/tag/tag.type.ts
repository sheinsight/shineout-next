import { TagProps as UnStyledTagProps, TagInputProps as UnStyledTagInputProps } from '@sheinx/base';

/**
 * @title Tag
 */
export type TagProps = Omit<UnStyledTagProps, 'jssStyle' | 'inlineStyle' | 'onMouseDown'>;

/**
 * @title Tag.Input
 */
export type TagInputProps = Omit<UnStyledTagInputProps, 'jssStyle' | 'inlineStyle'>;
