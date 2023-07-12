import cssVars from '../cssvar';
import { JsStyles } from '../jss-style';

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
  | 'large'
  | '@keyframes primaryAnimation'
  | '@keyframes successAnimation'
  | '@keyframes dangerAnimation'
  | '@keyframes warningAnimation'
  | '@keyframes defaultAnimation'
  | '@keyframes secondaryAnimation';

const button = (type: string) => ({
  color: cssVars[`button${type}Color` as keyof typeof cssVars],
  backgroundColor: cssVars[`button${type}Bg` as keyof typeof cssVars],
  borderColor: cssVars[`button${type}BorderColor` as keyof typeof cssVars],

  '&:hover': {
    color: cssVars[`button${type}ColorHover` as keyof typeof cssVars],
    backgroundColor: cssVars[`button${type}BgHover` as keyof typeof cssVars],
    borderColor: cssVars[`button${type}BorderColorHover` as keyof typeof cssVars],
  },

  '&:active': {
    animationName: `$${type.toLocaleLowerCase()}Animation`,
  },
});

const text = (type: string) => ({
  color: cssVars[`${type.toLocaleLowerCase()}Color` as keyof typeof cssVars],
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
    fontSize: cssVars.buttonDefaultFontSize,
    borderRadius: cssVars.buttonBorderRadius,
    lineHeight: cssVars.buttonDefaultLineHeight,
    padding: `${cssVars.buttonDefaultPaddingY} ${cssVars.buttonDefaultPaddingX}`,
    transition: 'all 0.15s ease-in-out',

    '& + &': {
      marginLeft: cssVars.buttonNearlyMargin,
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
    fontSize: cssVars.buttonSmallFontSize,
    padding: `${cssVars.buttonSmallPaddingY} ${cssVars.buttonSmallPaddingX}`,
  },

  large: {
    fontSize: cssVars.buttonLargeFontSize,
    padding: `${cssVars.buttonLargePaddingY} ${cssVars.buttonLargePaddingX}`,
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

    '&:active': {
      animationName: 'none',
    },

    '&:hover': {
      opacity: 0.65,
    },
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

  // animation
  '@keyframes defaultAnimation': cssVars.buttonDefaultActiveAnimation,
  '@keyframes primaryAnimation': cssVars.buttonPrimaryActiveAnimation,
  '@keyframes successAnimation': cssVars.buttonSuccessActiveAnimation,
  '@keyframes dangerAnimation': cssVars.buttonDangerActiveAnimation,
  '@keyframes warningAnimation': cssVars.buttonWarningActiveAnimation,
  '@keyframes secondaryAnimation': cssVars.buttonSecondaryActiveAnimation,
};

export default ButtonStyle;
