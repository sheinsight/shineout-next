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
  | 'Tangerine';

const tag = (type: TagType) => ({
  // bright 亮色风格
  '&$bright': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid transparent`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '& $closeIcon': {
      // fill: Token[`tag${type}IconFontColor`],
    },
    '&[data-soui-type="dark"]': {
      '&$disabled': {
        backgroundColor: Token.tagDefaultFillBackgroundColor,
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
  },

  '&$fill': {
    color: Token[`tag${type}FillFontColor`],
    backgroundColor: Token[`tag${type}FillBackgroundColor`],
    border: `1px solid ${Token[`tag${type}FillBorderColor`]}`,

    '& $closeIconWrapper': {
      fill: Token[`tag${type}FillFontColor`],
      '&:hover': {
        fill: Token[`tag${type}FontColor`],
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '& $closeIcon': {
      fill: Token[`tag${type}FillFontColor`],
    },

    '&$disabled': {
      color: Token[`tag${type}FillDisabledFontColor`],
      backgroundColor: Token[`tag${type}FillDisabledBackgroundColor`],
      border: `1px solid ${Token[`tag${type}FillDisabledBorderColor`]}`,

      '& $closeIconWrapper': {
        fill: Token[`tag${type}FillDisabledFontColor`],
        '&:hover': {
          fill: Token[`tag${type}FillFontColor`],
          backgroundColor: 'transparent',
        },
      },
    },
  },

  // outline 边框风格
  '&$outline': {
    background: Token[`tag${type}OutlineBackgroundColor`],
    color: Token[`tag${type}OutlineFontColor`],
    border: `1px solid ${Token[`tag${type}OutlineBorderColor`]}`,

    '& $closeIconWrapper': {
      // hover
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

  // brightOutline 亮色边框风格
  '&$brightOutline': {
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

  '& $closeIcon': {
    fill: Token[`tag${type}FontColor`],
  },
});

const TagStyle: JsStyles<keyof TagClasses> = {
  rootClass: {},
  tag: {
    display: 'inline-flex',
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
    '&[data-soui-input-border]': {
      width: 100,
      '& input': {
        padding: `0 ${Token.tagInputPaddingX}`,
      },
    },
  },
  wrapper: {
    flex: 1,
    minWidth: 0,
    lineHeight: Token.lineHeightDynamic,
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
        width: 14,
        height: 14,
      },
    },
  },
  small: {
    fontSize: Token.tagSmallFontSize,
    lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
    padding: `0 ${Token.tagSmallPaddingX}`,
    fontWeight: Token.tagSmallFontWeight,
    borderRadius: Token.tagSmallBorderRadius,
    '& $wrapper': {
      lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
    },
    '& $closeIcon': {
      height: `calc(${Token.tagSmallFontSize} + 6px)`,
    },
    '& $closeIconWrapper': {
      width: `calc(${Token.tagSmallFontSize} + 6px)`,
      height: `calc(${Token.tagSmallFontSize} + 6px)`,
      lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
      '& svg': {
        width: 12,
        height: 12,
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
    marginLeft: 4,
    alignItems: 'center',
    display: 'inline-flex',
    cursor: 'pointer',
    height: Token.lineHeightDynamic,
  },

  closeIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    width: `calc(1em + 4px)`,
    height: `calc(1em + 4px)`,
    '& svg': {
      width: 12,
      height: 12,
    },
  },

  info: {
    ...tag('Info'),
  },
  default: {
    ...tag('Default'),
  },
  success: {
    ...tag('Success'),
  },
  warning: {
    ...tag('Warning'),
  },
  danger: {
    ...tag('Danger'),
  },
  brown: {
    ...tag('Brown'),
  },
  magenta: {
    ...tag('Magenta'),
  },
  purple: {
    ...tag('Purple'),
  },
  indigo: {
    ...tag('Indigo'),
  },
  cyan: {
    ...tag('Cyan'),
  },
  neon: {
    ...tag('Neon'),
  },
  lemon: {
    ...tag('Lemon'),
  },
  tangerine: {
    ...tag('Tangerine'),
  },

  fill: {},
  bright: {},
  outline: {},
  brightOutline: {},
  rounded: {
    borderRadius: Token.buttonRoundBorderRadius,
  },
};

export default TagStyle;
