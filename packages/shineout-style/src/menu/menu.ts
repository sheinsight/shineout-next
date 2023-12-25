// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type MenuClasses = {
  wrapper: string;
};
export type MenuClassType = keyof MenuClasses;

const menuStyle: JsStyles<MenuClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default menuStyle;
