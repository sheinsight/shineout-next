import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BadgeClasses = {
  badge: string;
  count: string;
  custom: string;
};
export type BadgeClassType = keyof BadgeClasses;

const badgeStyle: JsStyles<BadgeClassType> = {
  badge: {
    boxSizing: 'border-box',
    width: 'fit-content',
    margin: 0,
    padding: 0,
    lineHeight: 1,
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block',

    '& $count,$custom': {
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      transform: 'translate(50%, -50%)',
      transformOrigin: '100% 0',
    },
  },
  count: {
    textAlign: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    minWidth: token.badgeCountHeight,
    height: token.badgeCountHeight,
    verticalAlign: 'super',
    // padding: `0 ${token.badgeCountPaddingX}`,
    lineHeight: token.lineHeightDynamic,
  },
  custom: {},
};

export default badgeStyle;
