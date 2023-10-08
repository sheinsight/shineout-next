import type { CSSProperties } from 'react';

interface Token {
  lineHeight: string;
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
  errorFocusShadow: string;

  innerTitlePaddingY: string;
  innerTitlePaddingX: string;
  smallInnerTitlePaddingY: string;
  smallInnerTitlePaddingX: string;
  largeInnerTitlePaddingY: string;
  largeInnerTitlePaddingX: string;
}
export default <T extends string>(name: T, token: Token = {} as any) => {
  return {
    [name]: {
      boxSizing: 'border-box',
      borderRadius: token.borderRadius,
      background: token.backgroundColor,
      border: `1px solid ${token.borderColor}`,
      color: token.fontColor,
      lineHeight: token.lineHeight,
      fontSize: token.fontSize,
      transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out;`,
      '&:hover': {
        borderColor: token.hoverBorderColor,
      },
      '[data-soui-type="input-group"] &': {
        borderWidth: 0,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        flex: 1,
        minWidth: 0,
      },
      '[data-soui-type="input-group"] [data-soui-type="input"] + &': {
        borderLeftWidth: '1px',
      },
    },
    [`${name}PaddingBox`]: {
      borderRadius: token.borderRadius,
      [`$${name}:not($${name}InnerTitle) &`]: {
        padding: `${token.paddingY} ${token.paddingX}`,
      },
      [`$${name}Small:not($${name}InnerTitle) &`]: {
        padding: `${token.smallPaddingY} ${token.smallPaddingX}`,
      },
      [`$${name}Large:not($${name}InnerTitle) &`]: {
        padding: `${token.largePaddingY} ${token.largePaddingX}`,
      },
    },
    [`${name}InnerTitle`]: {},
    [`${name}InnerTitleTop`]: {
      [`$${name}InnerTitle &`]: {
        paddingTop: token.innerTitlePaddingY,
        paddingLeft: token.innerTitlePaddingX,
        paddingRight: token.innerTitlePaddingX,
      },
      [`$${name}Small$${name}InnerTitle &`]: {
        paddingTop: token.smallInnerTitlePaddingY,
        paddingLeft: token.smallInnerTitlePaddingX,
        paddingRight: token.smallInnerTitlePaddingX,
      },
      [`$${name}Large$${name}InnerTitle &`]: {
        paddingTop: token.largeInnerTitlePaddingY,
        paddingLeft: token.largeInnerTitlePaddingX,
        paddingRight: token.largeInnerTitlePaddingX,
      },
    },
    [`${name}InnerTitleBottom`]: {
      [`$${name}InnerTitle &`]: {
        paddingBottom: token.innerTitlePaddingY,
        paddingLeft: token.innerTitlePaddingX,
        paddingRight: token.innerTitlePaddingX,
      },
      [`$${name}Small$${name}InnerTitle &`]: {
        paddingBottom: token.smallInnerTitlePaddingY,
        paddingLeft: token.smallInnerTitlePaddingX,
        paddingRight: token.smallInnerTitlePaddingX,
      },
      [`$${name}Large$${name}InnerTitle &`]: {
        paddingBottom: token.largeInnerTitlePaddingY,
        paddingLeft: token.largeInnerTitlePaddingX,
        paddingRight: token.largeInnerTitlePaddingX,
      },
    },

    [`${name}Small`]: {
      fontSize: token.smallFontSize,
    },
    [`${name}Large`]: {
      fontSize: token.largeFontSize,
    },
    [`${name}Focus`]: {
      borderColor: token.focusBorderColor,
      boxShadow: `0 0 0 2px ${token.focusShadow}`,
      '&:hover': {
        borderColor: token.focusBorderColor,
      },
    } as CSSProperties,
    [`${name}Error`]: {
      borderColor: token.errorBorderColor,
      '&:hover': {
        borderColor: token.errorBorderColor,
      },
      [`&$${name}Focus`]: {
        boxShadow: `0 0 0 2px ${token.errorFocusShadow}`,
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
        boxShadow: 'none',
      },
    },
    [`${name}NoBorder`]: {
      '&&': {
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
  } as Record<
    | `${T}`
    | `${T}PaddingBox`
    | `${T}InnerTitle`
    | `${T}InnerTitleTop`
    | `${T}InnerTitleBottom`
    | `${T}Focus`
    | `${T}Error`
    | `${T}Disabled`
    | `${T}Small`
    | `${T}Large`
    | `${T}Underline`
    | `${T}NoBorder`,
    any
  >;
};
