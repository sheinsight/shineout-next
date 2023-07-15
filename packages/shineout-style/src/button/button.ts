import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
console.log(Token.buttonPrimaryOutlineDisabledBackgroundColor);

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
  | 'text'
  | 'outline'
  | 'link'
  | 'href'
  | 'small'
  | 'large';

type ButtonType = 'Default' | 'Primary' | 'Secondary' | 'Danger' | 'Warning' | 'Success';

type ButtonStyleType = 'Text' | 'Outline' | '';

const button = (type: ButtonType, styles: ButtonStyleType) => ({
  color: Token[`button${type}${styles}FontColor`],
  backgroundColor: Token[`button${type}${styles}BackgroundColor`],
  borderColor: Token[`button${type}${styles}BorderColor`],

  '&:hover': {
    color: Token[`button${type}${styles}HoverFontColor`],
    backgroundColor: Token[`button${type}${styles}HoverBackgroundColor`],
    borderColor: Token[`button${type}${styles}HoverBorderColor`],
  },

  '&:active': {
    color: Token[`button${type}${styles}ActiveFontColor`],
    backgroundColor: Token[`button${type}${styles}ActiveBackgroundColor`],
    borderColor: Token[`button${type}${styles}ActiveBorderColor`],
  },

  '&:disabled': {
    color: Token[`button${type}${styles}DisabledFontColor`],
    backgroundColor: Token[`button${type}${styles}DisabledBackgroundColor`],
    borderColor: Token[`button${type}${styles}DisabledBorderColor`],
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
    ...button('Default', ''),
  },
  primary: {
    ...button('Primary', ''),
  },
  secondary: {
    ...button('Secondary', ''),
  },
  danger: {
    ...button('Danger', ''),
  },
  warning: {
    ...button('Warning', ''),
  },
  success: {
    ...button('Success', ''),
  },
  outline: {
    '&$default': {
      ...button('Default', 'Outline'),
    },
    '&$primary': {
      ...button('Primary', 'Outline'),
    },
    '&$success': {
      ...button('Success', 'Outline'),
    },
    '&$danger': {
      ...button('Danger', 'Outline'),
    },
    '&$warning': {
      ...button('Warning', 'Outline'),
    },
    '&$secondary': {
      ...button('Secondary', 'Outline'),
    },
  },
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
