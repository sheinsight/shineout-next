import { TagProps as UnStyledTagProps, TagInputProps as UnStyledTagInputProps, TagSemanticKey as _TagSemanticKey } from '@sheinx/base';

export type TagSemanticKey = _TagSemanticKey;

/**
 * @title Tag
 */
export type TagProps = Omit<UnStyledTagProps, 'jssStyle' | 'inlineStyle' | 'onMouseDown'>;

/**
 * @title Tag.Input
 */
export type TagInputProps = Omit<UnStyledTagInputProps, 'jssStyle' | 'inlineStyle'>;
