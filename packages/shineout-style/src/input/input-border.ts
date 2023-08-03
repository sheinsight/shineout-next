import type { CSSProperties } from 'react';

export default <T extends string>(
  name: T,
  token: {
    lineHeightDynamic: string;
    borderRadius: string;

    fontSize: string;
    smallFontSize: string;
    largeFontSize: string;

    paddingY: string;
    smallPaddingY: string;
    largePaddingY: string;

    paddingX: string;
    smallPaddingX: string;
    largePaddingX: string;

    borderColor: string;
    focusBorderColor: string;
    hoverBorderColor: string;
    disabledBorderColor: string;
    errorBorderColor: string;

    fontColor: string;
    disabledFontColor: string;

    backgroundColor: string;
    disabledBackgroundColor: string;

    focusShadow: string;
  } = {} as any,
) => {
  return {
    [name]: {
      boxSizing: 'border-box',
      borderRadius: token.borderRadius,
      background: token.backgroundColor,
      border: `1px solid ${token.borderColor}`,
      color: token.fontColor,
      lineHeight: token.lineHeightDynamic,
      fontSize: token.fontSize,
      transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out;`,
      '&:hover': {
        borderColor: token.hoverBorderColor,
      },
    },
    paddingBox: {
      padding: `${token.paddingY} ${token.paddingX}`,
      borderRadius: 'inherit',
    },
    [`${name}Small`]: {
      fontSize: token.smallFontSize,
      '& $paddingBox': {
        padding: `${token.smallPaddingY} ${token.smallPaddingX}`,
      },
    },
    [`${name}Large`]: {
      fontSize: token.largeFontSize,
      '& $paddingBox': {
        padding: `${token.largePaddingY} ${token.largePaddingX}`,
      },
    },
    [`${name}Focus`]: {
      borderColor: token.focusBorderColor,
      boxShadow: token.focusShadow,
      '&:hover': {
        borderColor: token.focusBorderColor,
      },
    } as CSSProperties,
    [`${name}Error`]: {
      borderColor: token.errorBorderColor,
      '&:hover': {
        borderColor: token.errorBorderColor,
      },
    } as CSSProperties,
    [`${name}Disabled`]: {
      color: token.disabledFontColor,
      backgroundColor: token.disabledBackgroundColor,
      borderColor: token.disabledBorderColor,
      boxShadow: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: token.disabledBorderColor,
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
