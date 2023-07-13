import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type ButtonClass =
  | 'button'
  | 'default'
  | 'disabled'
  | 'loading'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'link'
  | 'href'
  | 'text'
  | 'small'
  | 'large';

const button = (type: string) => ({
  color: Token[`button${type}FontColor` as keyof typeof Token],
  backgroundColor: Token[`button${type}BackgroundColor` as keyof typeof Token],
  borderColor: Token[`button${type}BorderColor` as keyof typeof Token],

  '&:hover': {
    color: Token[`button${type}HoverFontColor` as keyof typeof Token],
    backgroundColor: Token[`button${type}HoverBackgroundColor` as keyof typeof Token],
    borderColor: Token[`button${type}HoverBorderColor` as keyof typeof Token],
  },

  '&:active': {
    color: Token[`button${type}ActiveFontColor` as keyof typeof Token],
    backgroundColor: Token[`button${type}ActiveBackgroundColor` as keyof typeof Token],
    borderColor: Token[`button${type}ActiveBorderColor` as keyof typeof Token],
  },

  '&:disabled': {
    color: Token[`button${type}DisabledFontColor` as keyof typeof Token],
    backgroundColor: Token[`button${type}DisabledBackgroundColor` as keyof typeof Token],
    borderColor: Token[`button${type}DisabledBorderColor` as keyof typeof Token],
  },
});

const text = (type: string) => ({
  color: Token[`${type.toLocaleLowerCase()}Color` as keyof typeof Token],
  background: 'transparent',
  borderColor: 'transparent',

  '&:hover': {
    opacity: 0.8,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },

  '&:active': {
    animationName: 'none',
  },
});

const ButtonStyle: JsStyles<ButtonClass> = {
  button: {
    outline: 'none',
    fontWeight: 400,
    cursor: 'pointer',
    userSelect: 'none',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    backgroundImage: 'none',
    verticalAlign: 'middle',
    border: '1px solid transparent',
    fontSize: Token.buttonFontSize,
    borderRadius: Token.buttonBorderRadius,
    // lineHeight: Token.buttonLineHeight,
    padding: `${Token.buttonPaddingY} ${Token.buttonPaddingX}`,
    transition: 'all 0.15s ease-in-out',

    '& + &': {
      marginLeft: Token.buttonNearlyMargin,
    },

    '&:active': {
      animationDelay: '0s',
      backgroundImage: 'none',
      animationDuration: '0.4s',
      animationFillMode: 'none',
      animationIterationCount: '1',
      animationDirection: 'normal',
      animationPlayState: 'running',
      animationTimingFunction: 'ease-out',
    },
  },

  small: {
    fontSize: Token.buttonSmallFontSize,
    padding: `${Token.buttonSmallPaddingY} ${Token.buttonSmallPaddingX}`,
  },

  large: {
    fontSize: Token.buttonLargeFontSize,
    padding: `${Token.buttonLargePaddingY} ${Token.buttonLargePaddingX}`,
  },

  default: {
    ...button('Default'),
  },
  primary: {
    ...button('Primary'),
  },
  secondary: {
    ...button('Secondary'),
  },
  danger: {
    ...button('Danger'),
  },
  warning: {
    ...button('Warning'),
  },
  success: {
    ...button('Success'),
  },
  link: {},
  href: {
    textDecoration: 'none',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.65,
  },
  loading: {
    cursor: 'not-allowed',
    opacity: 0.65,

    '&:active': {
      animationName: 'none',
    },

    '&:hover': {
      opacity: 0.65,
    },
  },

  text: {
    '&$default': {
      ...text('Default'),
    },
    '&$primary': {
      ...text('Primary'),
    },
    '&$success': {
      ...text('Success'),
    },
    '&$danger': {
      ...text('Danger'),
    },
    '&$warning': {
      ...text('Warning'),
    },
    '&$secondary': {
      ...text('Secondary'),
    },
  },
};

export default ButtonStyle;
