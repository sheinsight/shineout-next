import { getTokenName } from '@sheinx/theme';
import type { CSSProperties } from 'react';

const supportsHas = () => {
  if (typeof CSS === 'undefined' || typeof CSS.supports === 'undefined') {
    return false;
  }
  return CSS.supports('selector(:has(*))');
};
interface Token {
  lineHeight: string;
  borderRadius: string;

  fontSize: string;
  fontWeight: string;
  smallFontSize: string;
  largeFontSize: string;

  paddingY: string;
  smallPaddingY: string;
  largePaddingY: string;

  paddingX: string;
  smallPaddingX: string;
  largePaddingX: string;

  borderColor: string;
  borderWidth: string;
  focusBorderColor: string;
  hoverBorderColor: string;
  disabledBorderColor: string;
  errorBorderColor: string;
  errorHoverBorderColor: string;
  errorFocusBorderColor: string;

  fontColor: string;
  disabledFontColor: string;

  backgroundColor: string;
  hoverBackgroundColor: string;
  focusBackgroundColor: string;
  disabledBackgroundColor: string;
  errorBackgroundColor: string;
  errorFocusBackgroundColor: string;
  errorHoverBackgroundColor: string;

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
      border: `${token.borderWidth} solid ${token.borderColor}`,
      color: token.fontColor,
      lineHeight: token.lineHeight,
      fontSize: token.fontSize,
      // verticalAlign: 'top',
      fontWeight: token.fontWeight,
      verticalAlign: 'top',
      transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out;`,
      '&:hover': {
        borderColor: token.hoverBorderColor,
        [`&:not($${name}Disabled):not($${name}Error)`]: {
          backgroundColor: token.hoverBackgroundColor,
        },
      },
      '[data-soui-role="input-group"] &&&, [data-soui-role="input-group"] &&&:hover': {
        borderWidth: 0,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        flex: 1,
        minWidth: 0,
      },
      '[data-soui-role="input-group"]:not([data-soui-border="false"]) [data-soui-input-border] + &&&': {
        borderLeftWidth: '1px',
      },
      '[data-soui-role="input-group-separate"] &&&, [data-soui-role="input-group-separate"] &&&:hover': {
        borderRadius: 0,
        flexShrink: 0,
        width: 'auto',
        'margin-left': `-1px`,

        '&:hover': {
          zIndex: 7,
        },

        '&:first-child': {
          marginLeft: 0,
          borderTopLeftRadius: token.borderRadius,
          borderBottomLeftRadius: token.borderRadius,
        },
        '&:last-child': {
          borderTopRightRadius: token.borderRadius,
          borderBottomRightRadius: token.borderRadius,
        },
      },

      '[dir=rtl][data-soui-role="input-group-separate"] &&&, [dir=rtl][data-soui-role="input-group-separate"] &&&:hover': {
        '&:first-child': {
          borderRadius: `0 ${token.borderRadius} ${token.borderRadius} 0`,
        },
        '&:last-child': {
          borderRadius: `${token.borderRadius} 0 0 ${token.borderRadius}`,
        },
      },
      ...(supportsHas() ? {
        [`[data-soui-role="input-group"]:has(&$${name}Error)`]: {
          borderColor: token.errorBorderColor,
          background: token.errorBackgroundColor,
          boxShadow: `0 0 0 2px ${token.errorFocusShadow}`,
        },
      } : {}),
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
      background: token.focusBackgroundColor,
      '&[data-soui-role="input-group-separate"]': {
        boxShadow: 'none',
      },

      '[data-soui-role="input-group-separate"] &': {
        zIndex: 1,
      },
      '&:hover': {
        borderColor: token.focusBorderColor,
      },
    } as CSSProperties,
    [`${name}Error`]: {
      '&&': {
        borderColor: token.errorBorderColor,
      },
      [`&:not($${name}Disabled)`]: {
        background: token.errorBackgroundColor,
        '&:hover': {
          borderColor: token.errorHoverBorderColor,
          backgroundColor: token.errorHoverBackgroundColor,
        }
      },
      [`&$${name}Focus`]: {
        boxShadow: `0 0 0 2px ${token.errorFocusShadow}`,
        borderColor: token.errorFocusBorderColor,
        background: token.errorFocusBackgroundColor,
        // '[data-soui-role="input-group-separate"]&': {
        //   boxShadow: 'none',
        // }
      },
    } as CSSProperties,
    [`${name}Disabled`]: {
      color: token.disabledFontColor,
      backgroundColor: token.disabledBackgroundColor,
      borderColor: token.disabledBorderColor,
      boxShadow: 'none',
      cursor: 'not-allowed',
      [getTokenName('inputInnerPlaceFontColor')]: token.disabledFontColor,
      [getTokenName('inputInnerFontColor')]: token.disabledFontColor,
      [`&:not($${name}Error):hover`]: {
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
