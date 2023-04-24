import type { CSSProperties } from 'react';
import { Theme } from '../themes/type';

export default <T extends string>(InputTheme: Theme['common']['inputBorder'], name: T) => {
  return {
    [name]: {
      borderRadius: InputTheme.radius,
      background: InputTheme.color.background.normal,
      border: `1px solid ${InputTheme.color.border.normal}`,
      color: InputTheme.color.text.normal,
      lineHeight: '1.42857143',
      '&:hover': {
        borderColor: InputTheme.color.border.focus,
      },
    } as CSSProperties,
    [`${name}Focus`]: {
      borderColor: InputTheme.color.border.focus,
      boxShadow: InputTheme.boxShadow.focus,
    } as CSSProperties,
    [`${name}Error`]: {
      borderColor: InputTheme.color.border.error,
    } as CSSProperties,
    [`${name}Disabled`]: {
      color: InputTheme.color.text.disabled,
      backgroundColor: InputTheme.color.background.disabled,
      borderColor: InputTheme.color.border.disabled,
      boxShadow: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: InputTheme.color.border.disabled,
      },
      '& *': {
        cursor: 'not-allowed',
      },
    },
  } as Record<`${T}` | `${T}Focus` | `${T}Error` | `${T}Disabled`, any>;
};
