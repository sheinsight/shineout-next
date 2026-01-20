import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { TagClasses } from '@sheinx/base';

type TagType =
  | 'Info'
  | 'Default'
  | 'Success'
  | 'Warning'
  | 'Danger'
  | 'Brown'
  | 'Magenta'
  | 'Purple'
  | 'Indigo'
  | 'Cyan'
  | 'Neon'
  | 'Lemon'
  | 'Orange'
  | 'Tangerine';

type tagType =
  | 'info'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'brown'
  | 'magenta'
  | 'purple'
  | 'indigo'
  | 'cyan'
  | 'neon'
  | 'lemon'
  | 'orange'
  | 'tangerine';
const tagDefaultLineHeight = `calc(${Token.tagDefaultLineBase} + 6px)`;

const animations = {
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const brightTag = (name: tagType, type: TagType) => ({
  color: Token[`tag${type}FontColor`],
  backgroundColor: Token[`tag${type}BackgroundColor`],
  border: `1px solid ${Token[`tag${type}BorderColor`]}`,

  '& $closeIconWrapper': {
    '&:hover': {
      backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
    },
  },
  '&[data-soui-type="dark"]': {
    '&$disabled': {
      backgroundColor: Token.tagDefaultFillBackgroundColor,
      borderColor: Token.tagDefaultFillBorderColor,
    },
  },

  '&$disabled': {
    color: Token[`tag${type}DisabledFontColor`],
    backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
    border: `1px solid ${Token[`tag${type}DisabledBorderColor`]}`,

    '& $closeIconWrapper': {
      fill: Token[`tag${type}IconDisabledFontColor`],
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
});

const fillTag = (name: tagType, type: TagType) => ({
  [`&$${name}`]: {
    color: Token[`tag${type}FillFontColor`],
    backgroundColor: Token[`tag${type}FillBackgroundColor`],
    border: `1px solid ${Token[`tag${type}FillBorderColor`]}`,

    '& $closeIconWrapper': {
      color: Token[`tag${type}FillFontColor`],
      '&:hover': {
        backgroundColor: Token[`tag${type}FillIconHoverBackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}FillDisabledFontColor`],
      backgroundColor: Token[`tag${type}FillDisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}FillDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        color: Token[`tag${type}FillDisabledFontColor`],
        '&:hover': {
          fill: Token[`tag${type}FillFontColor`],
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

const outlineTag = (name: tagType, type: TagType) => ({
  [`&$${name}`]: {
    background: Token[`tag${type}OutlineBackgroundColor`],
    color: Token[`tag${type}OutlineFontColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}BackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}OutlineDisabledFontColor`],
      backgroundColor: Token[`tag${type}OutlineDisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}OutlineDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}DisabledFontColor`],
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

const brightOutlineTag = (name: tagType, type: TagType) => ({
  [`&$${name}`]: {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '&$disabled': {
      color: Token[`tag${type}DisabledFontColor`],
      backgroundColor: Token[`tag${type}DisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}OutlineDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}IconDisabledFontColor`],
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

const TagStyle: JsStyles<keyof TagClasses> = {
  rootClass: {},
  tag: {
    display: 'inline-flex',
    // 消除 inline-flex 看不见的空白高度
    verticalAlign: 'top',
    padding: `${Token.tagPaddingY} ${Token.tagPaddingX}`,
    fontSize: Token.tagFontSize,
    fontWeight: Token.tagFontWeight,
    borderRadius: Token.tagBorderRadius,
    boxSizing: 'border-box',
    lineHeight: `calc(${Token.tagFontSize} + 4px)`,
    '& + &': {
      marginLeft: 8,
    },
  },
  input: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    width: 100,
    '& > div': {
      padding: '0 !important',
    },
    '& > div > input': {
      fontSize: Token.tagFontSize,
      padding: `0 ${Token.tagPaddingX}`,
      lineHeight: `calc(${Token.tagFontSize} + 8px)`,
    },
    '$small& > div > input': {
      padding: `0 ${Token.tagSmallPaddingX}`,
      lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
    },
    '$large& > div > input': {
      fontSize: Token.tagLargeFontSize,
      padding: `0 ${Token.tagLargePaddingX}`,
      lineHeight: `calc(${Token.tagLargeFontSize} + 8px)`,
    },
  },
  wrapper: {
    flex: 1,
    minWidth: 0,
    lineHeight: tagDefaultLineHeight,
  },
  inline: {
    display: 'inline-block',
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'top',
  },
  large: {
    fontSize: Token.tagLargeFontSize,
    lineHeight: `calc(${Token.tagLargeFontSize} + 8px)`,
    fontWeight: Token.tagLargeFontWeight,
    borderRadius: Token.tagLargeBorderRadius,
    padding: `${Token.tagLargePaddingY} ${Token.tagLargePaddingX}`,
    '& $closeIconWrapper': {
      '& svg': {
        width: Token.tagLargeFontSize,
        height: Token.tagLargeFontSize,
      },
    },
    '& $wrapper': {
      lineHeight: Token.tagLargeLineHeight,
    },
    '& $closeIcon': {
      height: Token.tagLargeLineHeight,
    },
  },
  small: {
    fontSize: Token.tagSmallFontSize,
    lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
    padding: `0 ${Token.tagSmallPaddingX}`,
    fontWeight: Token.tagSmallFontWeight,
    borderRadius: Token.tagSmallBorderRadius,
    '& $wrapper': {
      lineHeight: `var(${Token.tagSmallLineHeight}, calc(${Token.tagSmallFontSize} + 6px))`,
    },
    '& $closeIcon': {
      height: `var(${Token.tagSmallLineHeight}, calc(${Token.tagSmallFontSize} + 4px))`,
    },
    '& $closeIconWrapper': {
      '& svg': {
        width: Token.tagSmallFontSize,
        height: Token.tagSmallFontSize,
      },
    },
  },

  disabled: {
    cursor: 'not-allowed',
    '& $closeIcon': {
      cursor: 'not-allowed',
    },
  },

  closeIcon: {
    marginLeft: 2,
    alignItems: 'center',
    display: 'inline-flex',
    cursor: 'pointer',
    height: tagDefaultLineHeight,
    maxHeight: '100%',
  },

  ...animations,
  closeIconPending: {
    animation: `$spin 1s linear infinite`,
  },

  closeIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    width: `calc(1em + 4px)`,
    height: `calc(1em + 4px)`,
    '& svg': {
      width: Token.tagFontSize,
      height: Token.tagFontSize,
    },
  },

  info: {
    ...brightTag('info', 'Info'),
  },
  default: {
    ...brightTag('default', 'Default'),
  },
  success: {
    ...brightTag('success', 'Success'),
  },
  warning: {
    ...brightTag('warning', 'Warning'),
  },
  danger: {
    ...brightTag('danger', 'Danger'),
  },
  brown: {
    ...brightTag('brown', 'Brown'),
  },
  magenta: {
    ...brightTag('magenta', 'Magenta'),
  },
  purple: {
    ...brightTag('purple', 'Purple'),
  },
  indigo: {
    ...brightTag('indigo', 'Indigo'),
  },
  cyan: {
    ...brightTag('cyan', 'Cyan'),
  },
  neon: {
    ...brightTag('neon', 'Neon'),
  },
  lemon: {
    ...brightTag('lemon', 'Lemon'),
  },
  orange: {
    ...brightTag('orange', 'Orange'),
  },
  tangerine: {
    ...brightTag('tangerine', 'Tangerine'),
  },

  fill: {
    ...fillTag('default', 'Default'),
    ...fillTag('success', 'Success'),
    ...fillTag('warning', 'Warning'),
    ...fillTag('danger', 'Danger'),
    ...fillTag('info', 'Info'),
    ...fillTag('brown', 'Brown'),
    ...fillTag('magenta', 'Magenta'),
    ...fillTag('purple', 'Purple'),
    ...fillTag('indigo', 'Indigo'),
    ...fillTag('cyan', 'Cyan'),
    ...fillTag('neon', 'Neon'),
    ...fillTag('lemon', 'Lemon'),
    ...fillTag('tangerine', 'Tangerine'),
    ...fillTag('orange', 'Orange'),
  },
  bright: {},
  outline: {
    ...outlineTag('default', 'Default'),
    ...outlineTag('success', 'Success'),
    ...outlineTag('warning', 'Warning'),
    ...outlineTag('danger', 'Danger'),
    ...outlineTag('info', 'Info'),
    ...outlineTag('brown', 'Brown'),
    ...outlineTag('magenta', 'Magenta'),
    ...outlineTag('purple', 'Purple'),
    ...outlineTag('indigo', 'Indigo'),
    ...outlineTag('cyan', 'Cyan'),
    ...outlineTag('neon', 'Neon'),
    ...outlineTag('lemon', 'Lemon'),
    ...outlineTag('tangerine', 'Tangerine'),
    ...outlineTag('orange', 'Orange'),
  },
  brightOutline: {
    ...brightOutlineTag('default', 'Default'),
    ...brightOutlineTag('success', 'Success'),
    ...brightOutlineTag('warning', 'Warning'),
    ...brightOutlineTag('danger', 'Danger'),
    ...brightOutlineTag('info', 'Info'),
    ...brightOutlineTag('brown', 'Brown'),
    ...brightOutlineTag('magenta', 'Magenta'),
    ...brightOutlineTag('purple', 'Purple'),
    ...brightOutlineTag('indigo', 'Indigo'),
    ...brightOutlineTag('cyan', 'Cyan'),
    ...brightOutlineTag('neon', 'Neon'),
    ...brightOutlineTag('lemon', 'Lemon'),
    ...brightOutlineTag('tangerine', 'Tangerine'),
    ...brightOutlineTag('orange', 'Orange'),
  },
  rounded: {
    borderRadius: Token.buttonRoundBorderRadius,
  },
};

export default TagStyle;
