import { getTokenName } from '@sheinx/theme';
import type { CSSProperties } from 'react';

const supportsHas = () => {
  if (typeof CSS === 'undefined' || typeof CSS.supports === 'undefined') {
    return false;
  }
  return CSS.supports('selector(:has(*))');
};

/**
 * small / large 尺寸的圆角取值。
 *
 * 兼容老用户：inputSmallBorderRadius / inputLargeBorderRadius 是后加的 token，
 * 老用户的主题里只配置过 inputBorderRadius。这里必须回退到 inputBorderRadius，
 * 让 small、large 在用户没有单独配置时仍然跟随它，外观和以前保持一致。
 *
 * 不能直接用 token.inputSmallBorderRadius：它自带的默认值是 radius-default，
 * 会直接跳过用户配置的 inputBorderRadius。
 * setToken 默认只输出公共 token，不包含组件 token，所以用户没配置时下面的变量是未定义的，回退才会生效。
 * 注意：如果用户（或主题编辑器）显式把整套组件 token 传给 setToken，这两个变量会被定义为 token 的默认值，
 * 回退就不再生效。要覆盖这种情况，需要 theme 包里这两个 token 的默认值本身跟随 inputBorderRadius（尚未实现）。
 */
export const getSizeBorderRadius = (borderRadius: string) => ({
  small: `var(${getTokenName('inputSmallBorderRadius')}, ${borderRadius})`,
  large: `var(${getTokenName('inputLargeBorderRadius')}, ${borderRadius})`,
});

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
  disabledPlaceholderColor: string;

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
  const radius = getSizeBorderRadius(token.borderRadius);

  // 输入组（separate）里首尾元素的圆角。
  // 选择器的 & 数量刻意多于基础规则（基础是 &&&，rtl 还多一个属性选择器），保证不依赖样式表顺序也能覆盖基础圆角。
  const sizeGroupRadius = (r: string) => ({
    '[data-soui-role="input-group-separate"] &&&&&, [data-soui-role="input-group-separate"] &&&&&:hover': {
      '&:first-child': {
        borderTopLeftRadius: r,
        borderBottomLeftRadius: r,
      },
      '&:last-child': {
        borderTopRightRadius: r,
        borderBottomRightRadius: r,
      },
    },
    '[dir=rtl][data-soui-role="input-group-separate"] &&&&&, [dir=rtl][data-soui-role="input-group-separate"] &&&&&:hover': {
      '&:first-child': {
        borderRadius: `0 ${r} ${r} 0`,
      },
      '&:last-child': {
        borderRadius: `${r} 0 0 ${r}`,
      },
    },
  });

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
        flex: '1 1 auto',
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
      [`$${name}Small &`]: {
        borderRadius: radius.small,
      },
      [`$${name}Large &`]: {
        borderRadius: radius.large,
      },
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
      // && 让它的优先级高于基础圆角，不依赖样式表顺序。
      // 同优先级的 Underline 定义在后面，仍会把圆角置 0；输入组里的 borderRadius: 0 选择器更具体，同样会覆盖它。
      '&&': {
        borderRadius: radius.small,
      },
      ...sizeGroupRadius(radius.small),
    },
    [`${name}Large`]: {
      fontSize: token.largeFontSize,
      '&&': {
        borderRadius: radius.large,
      },
      ...sizeGroupRadius(radius.large),
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
      [`&:not($${name}Disabled)$${name}Focus`]: {
        boxShadow: `0 0 0 2px ${token.errorFocusShadow}`,
        borderColor: token.errorFocusBorderColor,
        background: token.errorFocusBackgroundColor,
        '&:hover': {
          borderColor: token.errorFocusBorderColor,
          background: token.errorFocusBackgroundColor,
        }
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
      [getTokenName('inputInnerPlaceFontColor')]: token.disabledPlaceholderColor,
      [getTokenName('inputInnerFontColor')]: token.disabledPlaceholderColor,
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
