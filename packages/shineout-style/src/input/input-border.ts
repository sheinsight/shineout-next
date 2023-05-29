import type { CSSProperties } from 'react';
import InputBorderVar from './input-border-var';
import { sizeVar } from '../themes/default';

export default <T extends string>(name: T, isInput?: boolean) => {
  return {
    [name]: {
      borderRadius: InputBorderVar.size.radius.default,
      background: InputBorderVar.color.background.default,
      border: `1px solid ${InputBorderVar.color.border.default}`,
      color: InputBorderVar.color.text.default,
      lineHeight: sizeVar.lineHeight,
      transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out;`,
      padding: `${isInput ? 0 : InputBorderVar.size.paddingY.default} ${
        InputBorderVar.size.paddingX.default
      }`,
      '&:hover': {
        borderColor: InputBorderVar.color.border.focus,
      },
    } as CSSProperties,
    [`${name}Small`]: {
      lineHeight: 1.5,
      fontSize: InputBorderVar.size.fontSize.small,
      padding: `${isInput ? 0 : InputBorderVar.size.paddingY.default} ${
        InputBorderVar.size.paddingX.default
      }`,
    },
    [`${name}Large`]: {
      fontSize: InputBorderVar.size.fontSize.large,
      padding: `${isInput ? 0 : InputBorderVar.size.paddingY.default} ${
        InputBorderVar.size.paddingX.default
      }`,
    },
    [`${name}Focus`]: {
      borderColor: InputBorderVar.color.border.focus,
      boxShadow: InputBorderVar.boxShadow.focus,
    } as CSSProperties,
    [`${name}Error`]: {
      borderColor: InputBorderVar.color.border.error,
      '&:hover': {
        borderColor: InputBorderVar.color.border.error,
      },
    } as CSSProperties,
    [`${name}Disabled`]: {
      color: InputBorderVar.color.text.disabled,
      backgroundColor: InputBorderVar.color.background.disabled,
      borderColor: InputBorderVar.color.border.disabled,
      boxShadow: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: InputBorderVar.color.border.disabled,
      },
      '& *': {
        cursor: 'not-allowed',
      },
    },
  } as Record<`${T}` | `${T}Focus` | `${T}Error` | `${T}Disabled` | `${T}Small` | `${T}Large`, any>;
};
