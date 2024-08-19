// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BadgeClasses = {
  badge: string;
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
  },
};

export default badgeStyle;
