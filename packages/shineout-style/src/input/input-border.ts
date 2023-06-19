import type { CSSProperties } from 'react';
import cssVars from '../cssvar';

export default <T extends string>(name: T) => {
  return {
    [name]: {
      boxSizing: 'border-box',
      borderRadius: cssVars.inputBorderRadius,
      background: cssVars.inputBg,
      border: `1px solid ${cssVars.inputBorderColor}`,
      color: cssVars.inputTextColor,
      commonLineHeight: cssVars.commonLineHeight,
      fontSize: cssVars.fontSize,
      transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out;`,
      '&:hover': {
        borderColor: cssVars.inputBorderFocusColor,
      },
    },
    paddingBox: {
      padding: `${cssVars.inputPaddingY} ${cssVars.inputPaddingX}`,
      borderRadius: 'inherit',
    },
    [`${name}Small`]: {
      lineHeight: 1.5,
      fontSize: cssVars.fontSizeSmall,
      '& $paddingBox': {
        padding: `${cssVars.inputPaddingYSmall} ${cssVars.inputPaddingXSmall}`,
      },
    },
    [`${name}Large`]: {
      fontSize: cssVars.fontSizeLarge,
      '& $paddingBox': {
        padding: `${cssVars.inputPaddingYLarge} ${cssVars.inputPaddingXLarge}`,
      },
    },
    [`${name}Focus`]: {
      borderColor: cssVars.inputBorderFocusColor,
      boxShadow: `0 0 0 ${cssVars.inputFocusWidth} ${cssVars.inputBorderFocusColorFade25}`,
    } as CSSProperties,
    [`${name}Error`]: {
      borderColor: cssVars.inputBorderErrorColor,
      '&:hover': {
        borderColor: cssVars.inputBorderErrorColor,
      },
    } as CSSProperties,
    [`${name}Disabled`]: {
      color: cssVars.inputDisabledColor,
      backgroundColor: cssVars.inputBgDisabled,
      borderColor: cssVars.inputBorderDisabledColor,
      boxShadow: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: cssVars.inputBorderDisabledColor,
      },
      '& *': {
        cursor: 'not-allowed',
      },
    },
    [`${name}Underline`]: {
      '&&': {
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderRadius: 0,
      },
    },
    [`${name}NoBorder`]: {
      '&&': {
        borderColor: 'transparent',
      },
    },
    [`${name}InGroup`]: {
      '&': {
        borderWidth: 0,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderColor: cssVars.inputBorderColor,
        flex: 1,
        minWidth: 0,
      },
      '& + &': {
        borderLeftWidth: '1px',
      },
    },
  } as Record<
    | 'paddingBox'
    | `${T}`
    | `${T}Focus`
    | `${T}Error`
    | `${T}Disabled`
    | `${T}Small`
    | `${T}Large`
    | `${T}Underline`
    | `${T}NoBorder`
    | `${T}InGroup`,
    any
  >;
};
