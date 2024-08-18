// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BadgeClasses =
  {
    wrapper: string;
  };
export type BadgeClassType = keyof BadgeClasses;

const badgeStyle: JsStyles<BadgeClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default badgeStyle;
