import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type TagType =
  | 'Info'
  | 'Default'
  | 'Success'
  | 'Warning'
  | 'Danger'
  | 'Orange'
  | 'Magenta'
  | 'Purple'
  | 'Indigo'
  | 'Cyan'
  | 'Neon'
  | 'Lemon'
  | 'Tangerine';

type TagClass =
  | 'tag'
  | 'inline'
  | 'disabled'
  | 'closeIcon'
  | 'closeIconWrapper'
  | 'info'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'orange'
  | 'magenta'
  | 'purple'
  | 'indigo'
  | 'cyan'
  | 'neon'
  | 'lemon'
  | 'tangerine'
  | 'large'
  | 'small'
  | 'outline'
  | 'fill'
  | 'bright'
  | 'brightOutline'
  | 'rounded'
  | 'input';

const tag = (type: TagType) => ({
  // bright 亮色风格
  '&$bright': {
    color: Token[`tag${type}FontColor`],
    backgroundColor: Token[`tag${type}BackgroundColor`],
    border: `1px solid ${Token[`tag${type}BorderColor`]}`,

    '& $closeIconWrapper': {
      '&:hover': {
        backgroundColor: Token[`tag${type}IconHoverBackgroundColor`],
      },
    },

    '& $closeIcon': {
      fill: Token[`tag${type}IconFontColor`],
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
        fill: Token[`tag${type}FillFontColor`],
        '&:hover': {
          fill: Token[`tag${type}FillFontColor`],
          backgroundColor: 'transparent',
        },
      },
    },
  },

  // outline 边框风格
  '&$outline': {
    background: '#fff',
    color: Token[`tag${type}FontColor`],
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

const TagStyle: JsStyles<TagClass> = {
  tag: {
    display: 'inline-flex',
    height: Token.tagHeight,
    padding: `${Token.tagPaddingY} ${Token.tagPaddingX}`,
    fontSize: Token.tagFontSize,
    borderRadius: Token.tagBorderRadius,
    // cursor: 'pointer',
    boxSizing: 'border-box',
    lineHeight: `calc(${Token.tagFontSize} + 4px)`,
    '& + &': {
      marginLeft: 8,
    },
  },
  input: {
    '&[data-soui-type="input"]': {
      width: 100,
      '& input': {
        padding: `0 ${Token.tagInputPaddingX}`,
      },
    },
  },
  inline: {
    display: 'inline-block',
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'top',
  },

  large: {
    height: Token.tagLargeHeight,
    fontSize: Token.tagLargeFontSize,
    lineHeight: `calc(${Token.tagLargeFontSize} + 8px)`,
    padding: `${Token.tagLargePaddingY} ${Token.tagLargePaddingX}`,
    '& $closeIconWrapper': {
      width: 18,
      height: 18,
      '& svg': {
        width: 14,
        height: 14,
      },
    },
  },
  small: {
    height: Token.tagSmallHeight,
    lineHeight: `calc(${Token.tagSmallFontSize} + 6px)`,
    padding: `0 ${Token.tagSmallPaddingX}`,
    '& $closeIconWrapper': {
      width: 16,
      height: 16,
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
    height: '100%',
    display: 'inline-flex',
    cursor: 'pointer',
  },

  closeIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    width: 16,
    height: 16,
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
  orange: {
    ...tag('Orange'),
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
