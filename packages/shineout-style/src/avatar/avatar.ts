import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type AvatarClasses = {
  wrapper: string;
  small: string;
  large: string;
  image: string;
  string: string;
  circle: string;
  square: string;
  icon: string;
  text: string;
  group: string;
  max: string;
  popover: string;
};
export type AvatarClassType = keyof AvatarClasses;

const avatarStyle: JsStyles<AvatarClassType> = {
  wrapper: {
    display: 'inline-flex',
    listStyle: 'none',
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: token.avatarFontColor,
    width: token.avatarWidth,
    height: token.avatarHeight,
    fontSize: token.avatarFontSize,
    fontWeight: token.avatarFontWeight,
    backgroundColor: token.avatarBackgroundColor,

    '& >img': {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  image: {
    backgroundColor: 'transparent',
  },
  circle: {
    borderRadius: token.avatarCircleBorderRadius,
  },
  square: {
    borderRadius: token.avatarSquareBorderRadius,
  },
  icon: {},
  text: {},
  string: {},
  group: {
    display: 'inline-flex',

    '& :not(:first-child)': {
      marginLeft: `-8px`,
    },
    '& $wrapper': {
      border: `${token.avatarGroupBorderWidth} solid ${token.avatarGroupBorderColor}`,
    },
  },
  small: {
    width: token.avatarSmallWidth,
    height: token.avatarSmallHeight,
    fontSize: token.avatarSmallFontSize,
  },
  large: {
    width: token.avatarLargeWidth,
    height: token.avatarLargeHeight,
    fontSize: token.avatarLargeFontSize,
  },
  max: {
    cursor: 'pointer',
    color: token.avatarMaxFontColor,
    fontWeight: token.avatarMaxFontWeight,
    '& $wrapper:hover': {
      color: token.avatarMaxHoverColor,
      backgroundColor: token.avatarMaxHoverBackgroundColor,
    },
  },
  popover: {
    padding: token.avatarPopoverPadding,
    maxWidth: 239,
    maxHeight: 116,
    overflow: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
};

export default avatarStyle;
